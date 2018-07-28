"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts = require("typescript");

// const fs_1 = require("@angular-devkit/schematics/filesystem");
const schematics_1 = require("@angular-devkit/schematics");
const core_1 = require("@angular-devkit/core");
const find_module_1 = require("@schematics/angular/utility/find-module");

// const ast_utils_1 = require("../utility/ast-utils");
// const change_1 = require("../utility/change");
const ast_utils_1 = require("@schematics/angular/utility/ast-utils");
const change_1 = require("@schematics/angular/utility/change");

function addProviderToNgModule(options, type) {
    return (host) => {
        if (options.skipImport || !options.module) {
            return host;
        }
        const modulePath = options.module;
        const text = host.read(modulePath);
        if (text === null) {
            throw new schematics_1.SchematicsException(`File ${modulePath} does not exist.`);
        }
        const sourceText = text.toString('utf-8');
        const source = ts.createSourceFile(modulePath, sourceText, ts.ScriptTarget.Latest, true);
        const componentPath = `/${options.path}/`
            + (options.flat ? '' : core_1.strings.dasherize(options.name) + '/')
            + core_1.strings.dasherize(options.name)
            + '.'
            + type;
        const typeName = core_1.strings.capitalize(type);
        const relativePath = find_module_1.buildRelativePath(modulePath, componentPath);
        const classifiedName = core_1.strings.classify(`${options.name}${typeName}`);
        const declarationChanges = ast_utils_1.addProviderToModule(source, modulePath, classifiedName, relativePath);
        const declarationRecorder = host.beginUpdate(modulePath);
        for (const change of declarationChanges) {
            if (change instanceof change_1.InsertChange) {
                declarationRecorder.insertLeft(change.pos, change.toAdd);
            }
        }
        host.commitUpdate(declarationRecorder);
        return host;
    };
}
exports.addProviderToNgModule = addProviderToNgModule;

function insertChanges(declarationRecorder, changes) {
    for (const change of changes) {
        if (change instanceof change_1.InsertChange) {
            declarationRecorder.insertLeft(change.pos, change.toAdd);
        }
    }
    return declarationRecorder
}
exports.insertChanges = insertChanges

function addImport(source, rootPath, reducerClassifiedName, reducerPath) {
    let lastImport;
    const importString = `\nimport { ${reducerClassifiedName} } from '${reducerPath}';`;
    // Loop
    const nodes = ast_utils_1.getSourceNodes(source)
    .filter(node => {
        return node.kind == ts.SyntaxKind.ImportDeclaration;
    })
    .map(imp => lastImport = imp)
    let position = lastImport.getEnd();
    return [new change_1.InsertChange(rootPath, position, importString)];
}

exports.addImport = addImport;

function addToRoot(options, rootDir, typeString, callback, formatImport) {
    return (host) => {
        // if no root is provided do no further modifications
        if (!options[rootDir]) {
            return host;
        }
        let rootPath = options[rootDir];
        // read root reducer text.
        const text = host.read(rootPath);
        if (text === null) {
            throw new schematics_1.SchematicsException(`File ${rootPath} does not exist.`);
        }
        const sourceText = text.toString('utf-8');
        // create new source file
        const source = ts.createSourceFile(rootPath, sourceText, ts.ScriptTarget.Latest, true);
        // create path to reducer file and reformat reducer name
        const splitPath = options.path.split('/');
        const filePath = '@app/'
            + splitPath.slice(3, splitPath.length).join('/')
            + '/'
            + core_1.strings.dasherize(options.name)
            + '.'
            + `${typeString}`;
        let classifiedName;
        if (options.appendRoot === true) {
            classifiedName = core_1.strings.classify(`${options.name}-${options.root}-${typeString}`);
        } else {
            classifiedName = core_1.strings.classify(`${options.name}-${typeString}`);
        }   
        // Add root inserts
        const changes = callback(options, source, rootPath, options.name, classifiedName);
        //
        const importString = formatImport(classifiedName);
        // Add insert change for imports
        const newImport = addImport(source, rootPath, importString, filePath);
        // insert changes
        let declarationRecorder = host.beginUpdate(rootPath);
        declarationRecorder = insertChanges(declarationRecorder, changes);
        declarationRecorder = insertChanges(declarationRecorder, newImport);
        host.commitUpdate(declarationRecorder);
        return host;
    }
}
exports.addToRoot = addToRoot

function formatImportReducer(classifiedName) {
  return classifiedName
}
exports.formatImportReducer = formatImportReducer;

function formatImportState(classifiedName) {
  return "I" + classifiedName + "Record, " + classifiedName + "Factory";
}
exports.formatImportState = formatImportState;


/**
 * Find the root reducer referred by a set of options passed to the schematics.
 */
function findFileToModifyFromOptions(host, options, typeString, key) {
    const fileToModifyPath = core_1.normalize('/' + (options.path) + '/' + options[key]);
    const fileToModifyBaseName = core_1.normalize(fileToModifyPath).split('/').pop();

    if (host.exists(fileToModifyPath)) {
        return core_1.normalize(fileToModifyPath);
    }
    else if (host.exists(fileToModifyPath + '.ts')) {
        return core_1.normalize(fileToModifyPath + '.ts');
    }
    else if (host.exists(fileToModifyPath + `.${typeString}.ts`)) {
        return core_1.normalize(fileToModifyPath + `.${typeString}.ts`);
    }
    else if (host.exists(fileToModifyPath + '/' + fileToModifyBaseName + `.${typeString}.ts`)) {
        return core_1.normalize(fileToModifyPath + '/' + fileToModifyBaseName + `.${typeString}.ts`);
    }
    else {
        const filePath = searchAllDirectories(host, "/src/app/", fileToModifyBaseName + `.${typeString}.ts`)
        if (filePath !== undefined) {
            return core_1.normalize(filePath + "/" + fileToModifyBaseName + `.${typeString}.ts`);
        } else {
            throw new Error('Specified root reducer does not exist');
        }
    }
}
exports.findFileToModifyFromOptions = findFileToModifyFromOptions;

function searchAllDirectories(host, path, targetFile) {
    const directories = host.getDir(path).subdirs;
    const filePath = recursiveDirectorySearch(directories, host, targetFile, path);
    return filePath;
}

function recursiveDirectorySearch(directories, host, targetFile, path) {
    let filePath;
    directories.forEach(directory => {
        const fileExists = checkFiles(host.getDir(path + directory).subfiles, targetFile);
        if (fileExists == true) {
            return path + directory;
        }
    });
    recursiveDirectorySearch(host.getDir(path).subdirs, host, targetFile, path);
}

function checkFiles(files, targetFile) {
    let fileExists = false;
    files.forEach(file => {
        if (file === targetFile) {
            fileExists = true;
        }
    })
    return fileExists;
}

function addReducerToCombinedReducers(options, source, rootPath, reducerName, reducerClassifiedName) {
    let lastReducer;
    let reducerString = `\n  ${core_1.strings.camelize(reducerName)}: ${reducerClassifiedName},`;

    // get file nodes and filter for the definition of the root reducer
    const nodes = ast_utils_1.getSourceNodes(source)
    .filter(node => {
        return node.kind == ts.SyntaxKind.CallExpression
        && node.expression.kind == ts.SyntaxKind.Identifier
        && node.parent.kind == ts.SyntaxKind.VariableDeclaration
    })
    nodes.map(node => {
        let props
        if (node.arguments[0].properties !== undefined) {
            props = node.arguments[0].properties;
        } else {
            props = node.arguments[0].arguments[0].properties;
        }
        // loop through reducers defined in the root reducer and set last one as lastReducer
        props.forEach(property => {
            lastReducer = property;
        })
    })
    let position
    // If root reducer is not empty
    if (lastReducer !== undefined) {
        // get end of node position
        position = lastReducer.getEnd();
        // if trailing comma exists, add 1 to last position. Othewise add comma before new reducer is added to file.
        if (lastReducer.parent.properties.hasTrailingComma) {
            position += 1;
        } 
        else {
            reducerString = ',' + reducerString;
        }
    } else {
        position = nodes[0].getEnd() - 3;
    }
    // return inserted reducer as array
    return [new change_1.InsertChange(rootPath, position, reducerString)];
}
exports.addReducerToCombinedReducers = addReducerToCombinedReducers;

function addStateToRootState(options, source, rootPath, stateName, stateClassifiedName) {
    let interfaceEnd;
    let stateEnd;
    let tempString;
    let interfaceString = `\n  ${core_1.strings.camelize(stateName)}: I${stateClassifiedName}Record;`;
    let stateString = `\n  ${core_1.strings.camelize(stateName)}: ${stateClassifiedName}Factory(),`;

    let rootName = rootPath.split("/");
    rootName = core_1.strings.classify(rootName[rootName.length-1].split('.')[0]);
    // get file nodes and filter for the definition of the root state
    const nodes = ast_utils_1.getSourceNodes(source)
    .forEach(node => {
        if (node.kind === ts.SyntaxKind.InterfaceDeclaration && 
           (node.name.escapedText === `I${rootName}State` || node.name.escapedText === "IAppState" )) {
            if (node.members.length === 0) {
                interfaceEnd = node.end - 2;
            } else {
                node.members.forEach(member => {
                    interfaceEnd = member.getEnd();
                })
            }
        }
        if (node.kind === ts.SyntaxKind.VariableDeclaration && 
         (node.name.escapedText === `${rootName}` || node.name.escapedText === "INITIAL_APP_STATE" ))
            {
            if (node.initializer.properties.length === 0) {
                stateEnd = node.end - 2;
            } else {
                node.initializer.properties.forEach(property => {
                    if (property.parent.properties.hasTrailingComma) {
                        stateEnd = property.getEnd() +1;
                    } else {
                        tempString = ',' + stateString;
                        stateEnd = property.getEnd();
                    }
                })
            }
        }
    })
    if (tempString !== undefined) {
        stateString = tempString;
    }
    // return inserted state as array
    // Error logging
    if (stateEnd === undefined) {
        console.log("Error generating state. Cannot state position");
    }
    if (interfaceEnd === undefined) {
        console.log("Error generating state. Cannot interface position");
    }

    return [
        new change_1.InsertChange(rootPath, stateEnd, stateString),
        new change_1.InsertChange(rootPath, interfaceEnd, interfaceString),
    ]
}
exports.addStateToRootState = addStateToRootState;