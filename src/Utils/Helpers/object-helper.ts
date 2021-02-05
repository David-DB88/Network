export const updateObjectInArray = (item: any, userId: any, someProps: any) => {
  return item.map((u: any) => {
    if (u.id === userId) {
      return { ...u, ...someProps };
    }
    return u;
  });
};
