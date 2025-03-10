import setFiles from "./files.ts";
import setAuth from "./auth.ts";
import setEditorHttp from "./editor/http.ts";
import setEditorWebSocket from "./editor/ws.ts";

export default ()=>{
  setFiles();
  setAuth();
  setEditorHttp();
  return setEditorWebSocket();
};