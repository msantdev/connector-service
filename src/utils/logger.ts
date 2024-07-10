export const info = (message: string) => {
    console.log(`[${new Date().toISOString()}] [INFO] ${message}`);
  };  

export const error = (message: string, error?: any) => {
    if (error) {
      console.error(`[${new Date().toISOString()}] [ERROR] ${message}`, error);
    } else {
      console.error(`[${new Date().toISOString()}] [ERROR] ${message}`);
    }
  };