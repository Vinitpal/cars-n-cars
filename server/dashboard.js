import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import * as AdminJSMongoose from "@adminjs/mongoose";
import bcrypt from "bcryptjs";

import Car from "./models/Car.js";
import User from "./models/User.js";
import Blog from "./models/Blog.js";

AdminJS.registerAdapter({
  Resource: AdminJSMongoose.Resource,
  Database: AdminJSMongoose.Database,
});

const adminJS = new AdminJS({
  rootPath: "/admin",
  resources: [
    {
      resource: Car,
      options: {
        properties: {
          _id: { isVisible: false },
          // createdAt: { isVisible: false },
          updatedAt: { isVisible: false },
          userId: {
            isVisible: { filter: false, show: true, edit: true, list: true },
          },
        },
        actions: {
          new: {
            isAccessible: (context) => {
              return (
                context.currentAdmin &&
                (context.currentAdmin.role === "Admin" ||
                  context.currentAdmin.role === "Dealer")
              );
            },
          },

          edit: {
            // can edit only if car is added by the dealer
            isAccessible: ({ record, currentAdmin }) => {
              if (currentAdmin.role === "Admin") {
                return true;
              }
              if (currentAdmin.role === "Dealer") {
                return record && record.params.userId === currentAdmin._id;
              }
              return false;
            },
          },

          delete: {
            // can only delete if car is added by the dealer
            isAccessible: ({ record, currentAdmin }) => {
              if (currentAdmin.role === "Admin") {
                return true;
              }
              if (currentAdmin.role === "Dealer") {
                return record && record.params.userId === currentAdmin._id;
              }
              return false;
            },
          },

          list: {
            // can only list if car is added by user
            isAccessible: ({ currentAdmin }) => {
              if (
                currentAdmin.role === "Admin" ||
                currentAdmin.role === "Dealer"
              ) {
                return true;
              }
              return false;
            },

            before: async (request, { currentAdmin }) => {
              // if the user is admin then no filter
              if (currentAdmin.role === "Admin") {
                return request;
              }

              // if the user is dealer then filter by userId
              if (currentAdmin.role === "Dealer") {
                return {
                  ...request,
                  filters: {
                    ...request.filters,
                    // if images length is 0
                    images: { $size: 0 },
                    userId: currentAdmin._id.toString(),
                  },
                };
              }
            },
          },

          show: {
            isAccessible: ({ currentAdmin }) => {
              if (
                currentAdmin.role === "Admin" ||
                currentAdmin.role === "Dealer"
              ) {
                return true;
              }
              return false;
            },
          },
        },
      },
    },
    {
      resource: User,
      options: {
        properties: {
          _id: { isVisible: false },
          password: { isVisible: false },
        },
        actions: {
          new: {
            isAccessible: false,
          },
          edit: {
            isAccessible: (context) => {
              return (
                context.currentAdmin && context.currentAdmin.role === "Admin"
              );
            },
          },
          delete: {
            isAccessible: (context) => {
              return (
                context.currentAdmin && context.currentAdmin.role === "Admin"
              );
            },
          },
        },
      },
    },
    {
      resource: Blog,
      options: {
        properties: {
          _id: { isVisible: false },
          // make everything unvisible in list page except title, id and date
          seoTitle: {
            isVisible: {
              list: false,
              filter: false,
              show: true,
              edit: true,
            },
          },
          seoDesc: {
            isVisible: {
              list: false,
              filter: false,
              show: true,
              edit: true,
            },
          },
          keywords: {
            isVisible: {
              list: false,
              filter: false,
              show: true,
              edit: true,
            },
          },
          seoSchema: {
            isVisible: {
              list: false,
              filter: false,
              show: true,
              edit: true,
            },
          },
          // title: {
          //   isVisible: {
          //     list: true,
          //     filter: true,
          //     show: true,
          //     edit: true,
          //   },
          // },
          // date: {
          //   isVisible: {
          //     list: true,
          //     filter: true,
          //     show: true,
          //     edit: true,
          //   },
          // },
          image: {
            isVisible: {
              list: false,
              filter: false,
              show: true,
              edit: true,
            },
          },
          content: {
            type: "richtext",
            isVisible: {
              list: false,
              filter: false,
              show: true,
              edit: true,
            },
          },

          createdAt: { isVisible: false },
          updatedAt: { isVisible: false },
        },
        actions: {
          new: {
            isAccessible: false,
          },
          edit: {
            isAccessible: (context) => {
              return (
                context.currentAdmin && context.currentAdmin.role === "Admin"
              );
            },
          },
          delete: {
            isAccessible: (context) => {
              return (
                context.currentAdmin && context.currentAdmin.role === "Admin"
              );
            },
          },
        },
      },
    },
  ],
  branding: {
    companyName: "Cars & Cars",
    withMadeWithLove: false,
  },
});

const router = AdminJSExpress.buildAuthenticatedRouter(
  adminJS,
  {
    authenticate: async (email, password) => {
      const user = await User.findOne({ email });
      if (user) {
        const matched = await bcrypt.compare(password, user.password);
        if (matched) {
          return user.toObject();
        }
      }
      return false;
    },
    cookiePassword: process.env.JWT_SECRET,
  },
  null,
  {
    secret: process.env.JWT_SECRET,
    resave: true,
    saveUninitialized: true,
  }
);

export default router;
