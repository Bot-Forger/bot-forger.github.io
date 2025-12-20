const numberShadow = (inputId, defaultValue) => 
  `<value name="${inputId}"><shadow type="math_number"><field name="NUM">${defaultValue}</field></shadow></value>`;

const stringShadow = (inputId, defaultValue) => 
  `<value name="${inputId}"><shadow type="string_shadow"><field name="TEXT">${defaultValue}</field></shadow></value>`;

const categoryColors = {
    // Events: "#e59e19"
    Tests: "#14e3a2"
};

export default `
<xml xmlns="https://developers.google.com/blockly/xml">
  <category name="Tests" colour="${categoryColors.Tests}">>
    <block type="tests_block1">
      ${stringShadow('INPUT', 'Hello')}
      ${numberShadow('INPUT2', 10)}
    </block>
    <block type="tests_block2">
      ${stringShadow('INPUT', 'ok')}
      ${numberShadow('INPUT2', 10)}
    </block>
    <block type="tests_block3">
      ${stringShadow('INPUT', 'ok')}
      ${numberShadow('INPUT2', 10)}
    </block>
    <block type="tests_block4">
      ${stringShadow('INPUT', 'ok')}
      ${numberShadow('INPUT2', 10)}
    </block>
    <block type="tests_block5">
      ${stringShadow('INPUT', 'ok')}
      ${numberShadow('INPUT2', 10)}
    </block>
  </category>
</xml>
`;