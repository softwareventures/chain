"use strict";

const typescript = require("typescript");
const fs = require("fs");

const program = typescript.createProgram(["index.d.ts"], {});
const source = program.getSourceFile("index.d.ts");
const printer = typescript.createPrinter();

const fix = context => node => {
    const visit = node => {
        if (
            typescript.isIdentifier(node) &&
            node.escapedText === "Chain"
        ) {
            return typescript.factory.createQualifiedName(
                typescript.factory.createIdentifier("chain"),
                typescript.factory.createIdentifier("Chain")
            );
        } else {
            return typescript.visitEachChild(node, visit, context);
        }
    };
    const visitTopLevel = node => {
        if (
            typescript.isInterfaceDeclaration(node) &&
            node.name.escapedText === "Chain"
        ) {
            return typescript.factory.createModuleDeclaration(
                [],
                [typescript.factory.createModifier(typescript.SyntaxKind.DeclareKeyword)],
                typescript.factory.createIdentifier("chain"),
                typescript.factory.createModuleBlock([node]),
                typescript.NodeFlags.Namespace
            );
        } else {
            return typescript.visitEachChild(node, visit, context);
        }
    };
    return typescript.visitEachChild(node, visitTopLevel, context);
};

if (source != null) {
    typescript.transform(source, [fix]).transformed.forEach(node => {
        if (typescript.isSourceFile(node)) {
            fs.writeFileSync("index.d.ts", printer.printFile(node));
        }
    });
}
