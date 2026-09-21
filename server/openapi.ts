export const openApiSpec = {
  openapi: "3.0.3",
  info: {
    title: "AsistAI API",
    version: "1.0.0",
    description:
      "API de captación institucional. El alta y el listado usan Postgres en el servidor (DATABASE_URL). El cliente solo usa VITE_SUPABASE_* para Auth.",
  },
  servers: [{ url: "/api", description: "API local (proxy Vite)" }],
  tags: [
    { name: "Health" },
    { name: "Registrations" },
  ],
  paths: {
    "/health": {
      get: {
        tags: ["Health"],
        summary: "Estado del servicio",
        responses: {
          "200": {
            description: "Servicio disponible",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "ok" },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/registrations": {
      post: {
        tags: ["Registrations"],
        summary: "Registrar nombre y correo",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/RegisterRequest" },
            },
          },
        },
        responses: {
          "201": {
            description: "Registro creado",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Registration" },
              },
            },
          },
          "400": { $ref: "#/components/responses/Error" },
          "409": { $ref: "#/components/responses/Error" },
          "503": { $ref: "#/components/responses/Error" },
        },
      },
      get: {
        tags: ["Registrations"],
        summary: "Listar registros (administradores)",
        security: [{ bearerAuth: [] }],
        responses: {
          "200": {
            description: "Listado ordenado por fecha descendente",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Registration" },
                },
              },
            },
          },
          "401": { $ref: "#/components/responses/Error" },
          "403": { $ref: "#/components/responses/Error" },
        },
      },
    },
    "/admin/me": {
      get: {
        tags: ["Registrations"],
        summary: "Comprobar sesión de administrador",
        security: [{ bearerAuth: [] }],
        responses: {
          "200": {
            description: "El token pertenece a un administrador",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { ok: { type: "boolean", example: true } },
                },
              },
            },
          },
          "401": { $ref: "#/components/responses/Error" },
          "403": { $ref: "#/components/responses/Error" },
        },
      },
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      RegisterRequest: {
        type: "object",
        additionalProperties: false,
        required: ["firstName", "lastName", "email", "username", "password", "careerCode"],
        properties: {
          firstName: { type: "string", minLength: 2, maxLength: 80 },
          lastName: { type: "string", minLength: 2, maxLength: 80 },
          email: {
            type: "string",
            format: "email",
            description: "Correo validado con reglas RFC 5321/5322",
          },
          username: { type: "string" },
          password: { type: "string", minLength: 8 },
          careerCode: { type: "string" },
        },
      },
      Registration: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid" },
          firstName: { type: "string" },
          lastName: { type: "string" },
          email: { type: "string", format: "email" },
          createdAt: { type: "string", format: "date-time" },
        },
      },
      ErrorBody: {
        type: "object",
        properties: {
          code: { type: "string" },
          message: { type: "string" },
          field: { type: "string" },
        },
      },
    },
    responses: {
      Error: {
        description: "Error de negocio o validación",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/ErrorBody" },
          },
        },
      },
    },
  },
};
