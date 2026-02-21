const numberShadow = (inputId, defaultValue) =>
  `<value name="${inputId}"><shadow type="math_number"><field name="NUM">${defaultValue}</field></shadow></value>`;

const stringShadow = (inputId, defaultValue) =>
  `<value name="${inputId}"><shadow type="string_shadow"><field name="TEXT">${defaultValue}</field></shadow></value>`;

const booleanShadow = (inputId, defaultValue) =>
  `<value name="${inputId}"><shadow type="logic_boolean"><field name="BOOL">${defaultValue.toString().toUpperCase()}</field></shadow></value>`;

const blockShadow = (inputId, blockId) =>
  `<value name="${inputId}"><shadow type="${blockId}"></shadow></value>`;

const sep = (gap = 50) => `<sep gap="${gap}"></sep>`;

const categoryColors = {
  Tests: "#14e3a2",
  Events: "#ffbf00",
  Operators: "#59c059",
  Controls: "#ffab19",
  Text: "#58a69c",
  Variables: "#ff8c1a",
  Dictionaries: "#EC4E2E",
  Lists: "#e53935",
  Functions: "#ff6680",
  Servers: "#5865F2",
  Members: "#437bc5",
  Messages: "#2d9528",
  Emojis: "#e0c138",
  Stickers: "#c7b04b",
  Invites: "#9e31b9",
  Webhooks: "#6243ac",
  Channels: "#435cac"
};

export default `
<xml xmlns="https://developers.google.com/blockly/xml">
  <category name="Events" colour=${categoryColors.Events}>
    <block type="events_whenStarted"></block>
    ${sep()}
    <button text="Create broadcast" callbackKey="ADD_GLOBAL_BROADCAST"></button>
    <block type="events_whenBroadcastRecieved"></block>
    <block type="events_broadcast"></block>
    ${sep()}
    <block type="events_messageEvent">
      ${blockShadow('MESSAGE', 'events_message')}
    </block>
    <block type="events_messageReactionEvent">
      ${blockShadow('MESSAGE', 'events_message')}
      ${blockShadow('REACTION', 'events_reaction')}
    </block>
    ${sep()}
    <block type="events_memberStatusEvent">
      ${blockShadow('MEMBER', 'events_member')}
    </block>
    <block type="events_memberBanEvent">
      ${blockShadow('MEMBER', 'events_member')}
    </block>
  </category>
  <category name="Control" colour="${categoryColors.Controls}">
    <block type="controls_wait">
      ${stringShadow('SECONDS', 10)}
    </block>
    ${sep()}
    <block type="controls_repeat">
      ${numberShadow('REPEAT', 10)}
    </block>
    <block type="controls_forever"></block>
    ${sep()}
    <block type="controls_if"></block>
    <block type="controls_if_else"></block>
    <block type="controls_inline_if_else">
      ${stringShadow('THEN', 'apple')}
      ${stringShadow('ELSE', 'banana')}
    </block>
    <block type="controls_waitUntil"></block>
    <block type="controls_while"></block>
    <block type="controls_try">
      ${blockShadow('ERROR', 'controls_try_error')}
    </block>
    <block type="controls_error">
      ${stringShadow('MESSAGE', 'Hello!')}
    </block>
    <block type="controls_stop"></block>
  </category>
  <category name="Operators" colour="${categoryColors.Operators}">
    <block type="operators_arithmetic">
      ${numberShadow('NUM1', 0)}
      ${numberShadow('NUM2', 0)}
    </block>
    <block type="operators_compare"></block>
    <block type="operators_operation"></block>
    <block type="operators_not"></block>
    <block type="operators_boolean"></block>
    ${sep()}
    <block type="operators_random">
      ${numberShadow('MIN', 1)}
      ${numberShadow('MAX', 10)}
    </block>
    <block type="operators_isEvenOrOdd">
      ${numberShadow('NUM', 5)}
    </block>
    <block type="operators_round">
      ${numberShadow('NUM', 0)}
    </block>
    <block type="operators_mod">
      ${numberShadow('NUM1', 0)}
      ${numberShadow('NUM2', 0)}
    </block>
    <block type="operators_of">
      ${numberShadow('NUM', 0)}
    </block>
    <block type="operators_null"></block>
    <block type="operators_pi"></block>
  </category>
  <category name="Text" colour="${categoryColors.Text}">
    <block type="text_asText"></block>
    <block type="text_join">
      <mutation items="2"></mutation>
    </block>
    <block type="text_length">
      ${stringShadow("TEXT", "")}
    </block>
    <block type="text_contains">
      ${stringShadow("TEXT", "")}
      ${stringShadow("SUB", "")}
    </block>
    <block type="text_startsEnds">
      ${stringShadow("TEXT", "")}
      ${stringShadow("SUB", "")}
    </block>
    <block type="text_lettersFrom">
      ${numberShadow("START", 1)}
      ${numberShadow("END", 3)}
      ${stringShadow("TEXT", "")}
    </block>
    <block type="text_replace">
      ${stringShadow("FROM", "")}
      ${stringShadow("TO", "")}
      ${stringShadow("TEXT", "")}
    </block>
    <block type="text_charAt">
      ${numberShadow("INDEX", 1)}
      ${stringShadow("TEXT", "")}
    </block>
    <block type="text_indexOf">
      ${stringShadow("SUB", "")}
      ${stringShadow("TEXT", "")}
    </block>
    <block type="text_toCase">
      ${stringShadow("TEXT", "")}
    </block>
    <block type="text_newLine"></block>
  </category>
  <category name="Variables" colour="${categoryColors.Variables}" custom="GLOBAL_VARIABLES"></category>
  <category name="Dictionaries" colour="${categoryColors.Dictionaries}">
    <block type="dictionaries_create">
        <mutation items="1"></mutation>
    </block>
    <block type="dictionaries_empty"></block>
    ${sep()}
    <block type="dictionaries_get">
      ${stringShadow('KEY', 'apple')}
    </block>
    <block type="dictionaries_set">
      ${stringShadow('KEY', 'apple')}
      ${stringShadow('VALUE', 'banana')}
    </block>
    <block type="dictionaries_delete">
      ${stringShadow('KEY', 'apple')}
    </block>
    <block type="dictionaries_values"></block>
    <block type="dictionaries_length"></block>
    <block type="dictionaries_isEmpty"></block>
  </category>
  <category name="Lists" colour="${categoryColors.Lists}">
    <block type="lists_create">
        <mutation items="2"></mutation>
    </block>
    <block type="lists_repeat">
      ${stringShadow('VALUE', 'Hello')}
      ${numberShadow('REPEAT', 10)}
    </block>
    <block type="lists_empty"></block>
    ${sep()}
    <block type="lists_get">
      ${numberShadow('ITEM', 1)}
    </block>
    <block type="lists_add">
      ${stringShadow('ITEM', 'apple')}
    </block>
    <block type="lists_set">
      ${numberShadow('ITEM', 1)}
      ${stringShadow('VALUE', 'Hello')}
    </block>
    <block type="lists_delete">
      ${numberShadow('ITEM', 1)}
    </block>
    <block type="lists_length"></block>
    <block type="lists_isEmpty"></block>
    <block type="lists_join">
      ${stringShadow('DELIMITER', ',')}
    </block>
    ${sep()}
    <block type="lists_forEach">
      ${blockShadow('ITEM', 'lists_forEach_item')}
      ${blockShadow('INDEX', 'lists_forEach_index')}
    </block>
    <block type="lists_filter">
      ${blockShadow('ITEM', 'lists_filter_item')}
      ${blockShadow('INDEX', 'lists_filter_index')}
    </block>
    <block type="lists_map">
      ${blockShadow('ITEM', 'lists_map_item')}
      ${blockShadow('INDEX', 'lists_map_index')}
    </block>
  </category>
  <category name="Functions" colour="${categoryColors.Functions}" custom="FUNCTIONS_CATEGORY"></category>
  ${sep()}
  <category name="Servers" colour="${categoryColors.Servers}">
    <block type="servers_joined"></block>
    <block type="servers_find">
      ${stringShadow('SEARCH', '')}
    </block>
    <block type="servers_getAttribute"></block>
    <block type="servers_isVerified"></block>
    ${sep()}
    <block type="servers_leave"></block>
  </category>
  <category name="Members" colour="${categoryColors.Members}">
    <block type="members_all"></block>
    <block type="members_find">
      ${stringShadow('SEARCH', 'lordcat__')}
    </block>
    <block type="members_getAttribute"></block>
    <block type="members_isBot"></block>
    ${sep()}
    <block type="members_ban">
      ${stringShadow('REASON', '')}
    </block>
    <block type="members_timeout">
      ${stringShadow('REASON', '')}
      ${numberShadow('SECONDS', 60)}
    </block>
    <block type="members_kick">
      ${stringShadow('REASON', '')}
    </block>
    <block type="members_isTimed"></block>
  </category>
  <category name="Messages" colour="${categoryColors.Messages}">
    <block type="messages_sendMessage">
      ${stringShadow('CONTENT', 'Hello world!')}
      ${booleanShadow('EPHEMERAL', false)}
    </block>
    <block type="messages_getAttribute"></block>
    <block type="messages_delete"></block>
    ${sep()}
    <block type="messages_pin"></block>
    <block type="messages_isPinned"></block>
    ${sep()}
    <block type="messages_react">
      ${stringShadow('REACTION', '🔥')}
    </block>
    <block type="messages_removeAllReactions"></block>
    <block type="messages_reactions"></block>
    <block type="messages_hasReaction">
      ${stringShadow('REACTION', '🔥')}
    </block>
  </category>
  <category name="Emojis" colour="${categoryColors.Emojis}">
    <block type="emojis_all"></block>
    <block type="emojis_find">
      ${stringShadow('SEARCH', 'cat')}
    </block>
    <block type="emojis_getAttribute"></block>
    <block type="emojis_isAnimated"></block>
    ${sep()}
    <block type="emojis_create">
      ${stringShadow('NAME', 'cat')}
      ${stringShadow('URL', '')}
    </block>
    <block type="emojis_rename">
      ${stringShadow('NAME', 'dog')}
    </block>
    <block type="emojis_delete"></block>
  </category>
  <category name="Stickers" colour="${categoryColors.Stickers}">
    <block type="stickers_all"></block>
    <block type="stickers_find">
      ${stringShadow('SEARCH', 'cat')}
    </block>
    <block type="stickers_getAttribute"></block>
    ${sep()}
    <block type="stickers_create">
      ${stringShadow('NAME', 'cat')}
      ${stringShadow('URL', '')}
    </block>
    <block type="stickers_rename">
      ${stringShadow('NAME', 'dog')}
    </block>
    <block type="stickers_delete"></block>
  </category>
  <category name="Invites" colour="${categoryColors.Invites}">
    <block type="invites_all"></block>
    <block type="invites_getAttribute"></block>
    <block type="invites_fetch">
      ${stringShadow('URL', '')}
    </block>
    ${sep()}
    <block type="invites_create">
      ${numberShadow('USES', 10)}
    </block>
    <block type="invites_delete"></block>
    <block type="invites_toggle"></block>
  </category>
  <category name="Webhooks" colour="${categoryColors.Webhooks}">
    <block type="webhooks_create">
      ${stringShadow('NAME', 'my webhook')}
      ${stringShadow('AVATAR', '')}
    </block>
    <block type="webhooks_getAttribute"></block>
    <block type="webhooks_fetch">
      ${stringShadow('ID', '')}
      ${stringShadow('TOKEN', '')}
    </block>
    ${sep()}
    <block type="webhooks_send">
      ${stringShadow('CONTENT', 'Hello!')}
    </block>
    <block type="webhooks_edit">
      ${stringShadow('VALUE', '')}
    </block>
    <block type="webhooks_delete"></block>
  </category>
  <category name="Channels" colour="${categoryColors.Channels}">
    <block type="channels_all"></block>
    <block type="channels_find">
      ${stringShadow('SEARCH', 'general')}
    </block>
    <block type="channels_getAttribute"></block>
    <block type="channels_canSend"></block>
    ${sep()}
    <block type="channels_create">
      ${stringShadow('CATEGORY', 'Text Channels')}
      ${stringShadow('NAME', 'general')}
    </block>
    <block type="channels_move">
      ${stringShadow('CATEGORY', 'Text Channels')}
    </block>
    <block type="channels_rename">
      ${stringShadow('NAME', 'general')}
    </block>
    <block type="channels_delete"></block>
    ${sep()}
    <block type="channels_setTopic">
      ${stringShadow('TOPIC', '')}
    </block>
    <block type="channels_setSlowmode">
      ${numberShadow('SECONDS', 60)}
    </block>
    <block type="channels_purge">
      ${numberShadow('MESSAGES', 5)}
    </block>
    <block type="channels_type">
      ${numberShadow('SECONDS', 60)}
    </block>
  </category>
</xml>
`;