const numberShadow = (inputId, defaultValue) => 
  `<value name="${inputId}"><shadow type="math_number"><field name="NUM">${defaultValue}</field></shadow></value>`;

const stringShadow = (inputId, defaultValue) => 
  `<value name="${inputId}"><shadow type="string_shadow"><field name="TEXT">${defaultValue}</field></shadow></value>`;

const blockShadow = (inputId, blockId) => 
  `<value name="${inputId}"><shadow type="${blockId}"></shadow></value>`;

const sep = () => `<sep gap="70"></sep>`;

const categoryColors = {
    Tests: "#14e3a2",
    Events: "#e59e19",
    Messages: "#2d9528",
    Members: "#437bc5",
    Emojis: "#e0c138",
    Stickers: "#c7b04b",
    Invites: "#734242",
    Webhooks: "#5d3535"
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
  <category name="Events" colour=${categoryColors.Events}>
    <block type="events_whenStarted"></block>
    ${sep()}
    <block type="events_messageEvent">
      ${blockShadow('MESSAGE', 'events_message')}
    </block>
    <block type="events_messageReactionEvent">
      ${blockShadow('MESSAGE', 'events_message')}
      ${blockShadow('REACTION', 'events_reaction')}
    </block>
    <block type="events_messagePinEvent">
      ${blockShadow('MESSAGE', 'events_message')}
    </block>
    ${sep()}
    <block type="events_memberJoin">
      ${blockShadow('MEMBER', 'events_member')}
    </block>
    <block type="events_memberBanEvent">
      ${blockShadow('MEMBER', 'events_member')}
    </block>
    <block type="events_memberKick">
      ${blockShadow('MEMBER', 'events_member')}
    </block>
    <block type="events_memberTimeoutEvent">
      ${blockShadow('MEMBER', 'events_member')}
      ${blockShadow('TIME', 'events_timeoutseconds')}
    </block>
  </category>
  <category name="Messages" colour="${categoryColors.Messages}">
    <block type="messages_sendMessage">
      ${stringShadow('CONTENT', 'Hello world!')}
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
  <category name="Members" colour="${categoryColors.Members}">
    <block type="members_all"></block>
    <block type="members_find">
      ${stringShadow('SEARCH', 'lordcat__')}
    </block>
    <block type="members_getAttribute"></block>
    <block type="members_isBot"></block>
    <block type="members_isInServer"></block>
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
    <block type="members_isModerated"></block>
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
    <block type="stickers_isAnimated"></block>
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
    <block type="invites_allChannel"></block>
    <block type="invites_getAttribute"></block>
    <block type="invites_fetch">
      ${stringShadow('URL', '')}
    </block>
    ${sep()}
    <block type="invites_create">
      ${numberShadow('USES', 10)}
    </block>
    <block type="invites_delete"></block>
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
      ${stringShadow('MESSAGE', 'Hello!')}
    </block>
    <block type="webhooks_edit">
      ${stringShadow('VALUE', '')}
    </block>
    <block type="webhooks_delete"></block>
  </category>
  <category name="Channels" colour="${categoryColors.Webhooks}">
    <block type="channels_all"></block>
    <block type="channels_find">
      ${stringShadow('SEARCH', 'general')}
    </block>
    <block type="channels_getAttribute"></block>
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