///<reference path="./node_modules/@types/node/index.d.ts"/>
///<reference path="./node_modules/@types/gulp/index.d.ts"/>
import {Gulpclass, Task, SequenceTask, MergedTask} from "gulpclass"
import * as gulp from "gulp"
import * as chai from "chai"
const shell = require("gulp-shell")
const tslint = require("gulp-tslint")
const stylish = require("tslint-stylish")
const mocha = require("gulp-mocha")
const istanbul = require("gulp-istanbul")
const remapIstanbul = require("remap-istanbul/lib/gulpRemapIstanbul")
const args = require('yargs').argv

@Gulpclass()
export class Gulpfile {
    
    /**
     * Runs typescript files compilation.
     */
    @Task()
    compile() {
        return gulp.src("package.json", { read: false })
            .pipe(shell(["tsc"]))
    }      

    /**
     * Runs before test coverage, required step to perform a test coverage.
     */
    @Task()
    coveragePre() {
        return gulp.src(["./build/src/**/*.js"])
            .pipe(istanbul())
            .pipe(istanbul.hookRequire());
    }    
    
    /**
     * Runs post coverage operations.
     */
    @Task("coveragePost", ["coveragePre"])
    coveragePost() {
        chai.should();
        chai.use(require("sinon-chai"));
        chai.use(require("chai-as-promised"));

        return gulp.src(["./build/test/**/*.js"])
            .pipe(mocha({
                bail: true,
                grep: !!args.grep ? new RegExp(args.grep) : undefined,
                timeout: 15000
            }))
            .pipe(istanbul.writeReports({
                reporters: ["json"]
            }));
    }    
    
    @Task()
    coverageRemap() {
        return gulp.src("./coverage/coverage-final.json")
            .pipe(remapIstanbul({
                reports: {
                    "html": "./coverage",
                    "text-summary": null,
                    "lcovonly": "./coverage/lcov.info"
                }
            }))
            .pipe(gulp.dest("./coverage"));
    }    
    
    /**
     * Runs ts linting to validate source code.
     */
    @Task()
    tslint() {
        return gulp.src(["./src/**/*.ts", "./test/**/*.ts", "./sample/**/*.ts"])
            .pipe(tslint())
            .pipe(tslint.report(stylish, {
                emitError: true,
                sort: true,
                bell: true
            }))
    }      
    
    /**
     * Compiles the code and runs tests + makes coverage report.
     */
    @SequenceTask()
    tests() {
        return ["compile", "tslint", "coveragePost", "coverageRemap"]
    }    
    
    @SequenceTask()
    runDev() {
        return ["compile"]
    }
    
}
