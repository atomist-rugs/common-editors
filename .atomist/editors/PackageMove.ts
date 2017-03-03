// Generated by Rug to TypeScript transpiler.

import { EditProject } from '@atomist/rug/operations/ProjectEditor'
import { PathExpressionEngine } from '@atomist/rug/tree/PathExpression'
import { Editor, Tags, Parameter } from '@atomist/rug/operations/Decorators'
import { Pattern } from '@atomist/rug/operations/RugOperation'
import { JavaSource, Project } from '@atomist/rug/model/Core'

/**
    PackageMove
    renames a Java package
 */
@Editor("PackageMove", "renames a Java package")
@Tags("java")
class PackageMove implements EditProject {

    @Parameter({
        displayName: "Current Package Name",
        description: "Name of Java package to rename",
        pattern: Pattern.java_package,
        validInput: "A valid Java package name, which consists of period-separated identifiers which have only alphanumeric characters, $ and _ and do not start with a number"
    })
    old_package: string

    @Parameter({
        displayName: "New Package Name",
        description: "New name for the Java package",
        pattern: Pattern.java_package,
        validInput: "A valid Java package name, which consists of period-separated identifiers which have only alphanumeric characters, $ and _ and do not start with a number"
    })
    new_package: string

    edit(project: Project) {
        let eng: PathExpressionEngine = project.context().pathExpressionEngine()
        eng.with<JavaSource>(project, '//JavaSource()', j => {
            if (j.pkg() == this.old_package) {
                j.movePackage(this.new_package)
            }
        })
    }
}
export let editor_packageMove = new PackageMove();