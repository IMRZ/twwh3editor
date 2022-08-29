import { useState } from 'react';

import AceEditor from 'react-ace';
import ace from 'ace-builds/src-noconflict/ace';
import luaWorkerUrl from 'ace-builds/src-noconflict/worker-lua.js?url';
ace.config.setModuleUrl('ace/mode/lua_worker', luaWorkerUrl);

import 'ace-builds/src-noconflict/mode-lua';
import 'ace-builds/src-noconflict/theme-monokai';

import styled from '@emotion/styled';

import { invokeRunScript } from '../api/loadstring';

const LuaEditor = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;

  & div {
    flex: 1;
  }
`;

const Editor = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const runCommand = () => {
    invokeRunScript(input)
      .then((r) => setOutput(JSON.stringify(r, null, 2)))
      .catch((e) => console.log(e));
  };

  return (
    <LuaEditor
      onKeyDown={(e) => {
        if (e.ctrlKey && e.code === 'Enter') {
          runCommand();
        }
      }}
    >
      <div>
        <AceEditor
          name="n1"
          mode="lua"
          theme="monokai"
          value={input}
          onChange={(v) => setInput(v)}
          fontSize={14}
          width="100%"
          height="100%"
          showGutter={true}
          highlightActiveLine={true}
          showPrintMargin={false}
          setOptions={{
            showLineNumbers: true,
            tabSize: 4,
          }}
        />
      </div>
      <div>
        <AceEditor
          name="n2"
          theme="monokai"
          value={output}
          onChange={(v) => setOutput(v)}
          fontSize={14}
          width="100%"
          height="100%"
          showGutter={true}
          highlightActiveLine={true}
          showPrintMargin={false}
          setOptions={{
            showLineNumbers: true,
            tabSize: 4,
          }}
        />
      </div>
    </LuaEditor>
  );
}

export default Editor;
