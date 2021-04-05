const { program } = require('commander');
const { version } = require('./constance');

const mapAction = {
  create: {
    desc: 'create a new project',
    action: require('./create'),
    example: 'qingfeng create <name>',
  },
  '*': {
    desc: 'common not find',
    example: '',
    action: () => {
      console.log('command not find!');
    },
  },
};

program.version(version);

Reflect.ownKeys(mapAction).map((action) => {
  program
    .command(action)
    .description(mapAction[action]['desc'])
    .action(mapAction[action]['action']);
});

program.on('--help', () => {
  console.log(`\nExample:`)
  Reflect.ownKeys(mapAction).forEach((action) => {
    if(action === '*') return;
    console.log(`\n  ${action}: ${mapAction[action].example}`);
  });
});

// 解析用户传递的参数
program.parse(process.argv);
