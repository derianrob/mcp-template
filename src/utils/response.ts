type ResponseContent = {
  type: 'text';
  text: string;
};

type McpResponse = {
  content: ResponseContent[];
};

export const response = (data: unknown): McpResponse => ({
  content: [
    {
      type: 'text',
      text: JSON.stringify(data, null, 2),
    },
  ],
});

export const errorResponse = (error: unknown | Error): McpResponse => {
  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(error, null, 2),
      },
    ],
  };
};
