export enum Endpoint {
  COURSES
}

export const ENDPOINT_BASE: string = 'https://json-server-vercel-vert.vercel.app/';

export const EndpointPaths = new Map<Endpoint, String>(
  [
    [Endpoint.COURSES, 'courses']
  ]
)
