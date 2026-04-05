/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(protected)` | `/(protected)/adminDashboard` | `/(protected)/style/adminDashboard` | `/(protected)/style/userDashboard` | `/(protected)/userDashboard` | `/_sitemap` | `/adminDashboard` | `/login` | `/register` | `/style/adminDashboard` | `/style/userDashboard` | `/userDashboard`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
