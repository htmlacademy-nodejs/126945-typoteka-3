'use strict'

const {ExitCode} = require('../../../constants');

const helpText =    'Программа запускает http-сервер и формирует файл с данными для API.\n\n'+
                    'Гайд:\n'+
                    'service.js <command>\n'+
                    'Команды:\n'+
                    ' --version: выводит номер версии\n'+
                    ' --help: печатает этот текст\n'+
                    ' --generate <count> формирует файл mocks.json\n';

module.exports = {
    name: '--help',
    run: function() {
        console.log(helpText);
        process.exit(ExitCode.success);
    }
}