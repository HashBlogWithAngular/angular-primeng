import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpLink } from "apollo-angular/http";
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { provideHttpClient, withFetch } from "@angular/common/http";
import { Apollo, APOLLO_OPTIONS } from "apollo-angular";

const uri = 'https://gql.hashnode.com/'; // <-- add the URL of the GraphQL server here

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  return {
    link: httpLink.create({uri}),
    cache: new InMemoryCache(),
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideClientHydration(), provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
    Apollo
  ]
};
