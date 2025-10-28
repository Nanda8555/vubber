// function to simulate loading
export const createDelayedResource = <T>(data: T, delay = 2000) => {
  const createResource = <T>(promise: Promise<T>) => {
    let status = "pending";
    let result: T;
    let error: Error;

    const suspender = promise.then(
      (data) => {
        status = "success";
        result = data;
      },
      (e) => {
        status = "error";
        error = e;
      }
    );

    return {
      read() {
        if (status === "pending") {
          throw suspender;
        } else if (status === "error") {
          throw error;
        } else {
          return result;
        }
      },
    };
  };

  return createResource(
    new Promise<T>((resolve) => {
      setTimeout(() => {
        resolve(data);
      }, delay);
    })
  );
}; 