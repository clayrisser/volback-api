export default [
  {
    template: {
      args: ['--help']
    },
    functions: {
      help: []
    }
  },
  {
    template: {
      args: ['volumes'],
      responseRegex: '/^(?!ID)[^\\s]+/gm'
    },
    functions: {
      getVolumes: []
    }
  },
  {
    template: {
      args: ['backup', '{volumeId}']
    },
    functions: {
      backupVolume: ['volumeId']
    }
  }
];
