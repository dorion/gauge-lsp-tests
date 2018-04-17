var languageclient = require('./lsp/languageclient');
var fileExtension = require('./util/fileExtension');
var path = require('path');
var customLogPath;
step("pre-requisite <relativePath>", function(relativePath) {
    process.env.logs_directory = path.relative(relativePath,'logs')+"/lsp-tests/"+customLogPath;

    languageclient.prerequisite(relativePath,process.env.language);
});

step('open the project <relativePath>', async function (relativePath) {
    try{
        await languageclient.openProject(relativePath);
    }
    catch(err){
        throw new Error("unable to start gauge daemon "+err)
    }
});

beforeScenario(async function(context){
    customLogPath = context.currentSpec.name+"/"+context.currentScenario.name;
})

afterScenario(async function () {
    try{
        await languageclient.shutDown()
    }catch(err){
        throw new Error("trying to stop gauge daemon failed "+err)
    }
});