import getApp from "./front-api/index.ts"

getApp().listen(3000, () => console.log('Server running on port 3000'));
