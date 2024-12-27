const { contextBridge } = require('electron');

// Renderer 프로세스에서 사용할 API를 노출
contextBridge.exposeInMainWorld('api', {
  exampleFunction: () => console.log('Preload script is working!'),
});
