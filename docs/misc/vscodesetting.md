```json
{
    "clangd.path": "clangd", // 直接使用环境变量
    // Clangd 运行参数(在终端/命令行输入 clangd --help-list-hidden 可查看更多)
    "clangd.arguments": [
        //  "--all-scopes-completion", // 全局补全(补全建议会给出在当前作用域不可见的索引,插入后自动补充作用域标识符),例如在main()中直接写cout,即使没有`#include <iostream>`,也会给出`std::cout`的建议,配合"--header-insertion=iwyu",还可自动插入缺失的头文件
        "--background-index", // 后台分析并保存索引文件
        "--clang-tidy", // 启用 Clang-Tidy 以提供「静态检查」，下面设置 clang tidy 规则
        "--clang-tidy-checks=performance-*, bugprone-*, misc-*, google-*, modernize-*, readability-*, portability-*",
        "--compile-commands-dir=${workspaceFolder}/build/", // 编译数据库(例如 compile_commands.json 文件)的目录位置
        "--completion-parse=auto", // 当 clangd 准备就绪时，用它来分析建议
        "--completion-style=bundled", // 建议风格：打包(重载函数只会给出一个建议);还可以设置为 detailed
        // "--query-driver=/usr/bin/clang++", // MacOS 上需要设定 clang 编译器的路径，homebrew 安装的clang 是 /usr/local/opt/llvm/bin/clang++
        // 启用配置文件(YAML格式)项目配置文件是在项目文件夹里的“.clangd”,用户配置文件是“clangd/config.yaml”,该文件来自:Windows: %USERPROFILE%\AppData\Local || MacOS: ~/Library/Preferences/ || Others: $XDG_CONFIG_HOME, usually ~/.config
        // "--enable-config",
        "--fallback-style=Webkit", // 默认格式化风格: 在没找到 .clang-format 文件时采用,可用的有 LLVM, Google, Chromium, Mozilla, Webkit, Microsoft, GNU
        "--function-arg-placeholders=false", // 补全函数时，将会给参数提供占位符，键入后按 Tab 可以切换到下一占位符，乃至函数末
        //  "--header-insertion-decorators", // 输入建议中，已包含头文件的项与还未包含头文件的项会以圆点加以区分
        "--header-insertion=never", // 插入建议时自动引入头文件 iwyu [never,iwyu]
        //  "--include-cleaner-stdlib", // 为标准库头文件启用清理功能(不成熟!!!)
        // "--log=verbose", // 让 Clangd 生成更详细的日志
        "--pch-storage=memory", // pch 优化的位置(Memory 或 Disk,前者会增加内存开销，但会提升性能)
        "--pretty", // 输出的 JSON 文件更美观
        "--ranking-model=decision_forest", // 建议的排序方案：hueristics (启发式), decision_forest (决策树)
        // "--query-driver=C:\\Users\\11850\\scoop\\apps\\msys2\\2023-07-18\\mingw64\\bin\\g++*", // windows下的mingw位置
        "-j=12" // 同时开启的任务数量
    ],
    // Clangd 找不到编译数据库(例如 compile_flags.json 文件)时采用的设置,缺陷是不能直接索引同一项目的不同文件,只能分析系统头文件、当前文件和include的文件
    "clangd.fallbackFlags": [
        "-std=c++23",
        "-I\"C:/winlibs-x86_64-posix-seh-gcc-14.2.0-mingw-w64ucrt-12.0.0-r2/mingw64/include\"",
        "--target=x86_64-w64-windows-gnu" // 默认使用window gcc(MinGW),如果你是linux，就改成"--target=x86_64-pc-linux-gnu"
    ],
    "clangd.onConfigChanged": "restart", // 重启 clangd 时重载配置,具体方法: F1 + Fn 打开命令面板，然后搜索“clangd: restart”
    "clangd.serverCompletionRanking": true, // 借助网上的信息排序建议
    "clangd.detectExtensionConflicts": true, // 当其它拓展与 clangd 冲突时警告并建议禁用
    "editor.suggest.snippetsPreventQuickSuggestions": true,
    "editor.mouseWheelZoom": true,
    "editor.stickyScroll.enabled": false,
    "explorer.confirmDelete": false,
    "explorer.compactFolders": false,
    "workbench.iconTheme": "material-icon-theme",
    "editor.minimap.renderCharacters": false,
    "editor.minimap.enabled": false,
    "files.exclude": {
        "**/.git": false
    },
    "workbench.settings.applyToAllProfiles": [
    
    ],
    "files.autoSaveDelay": 500,
    "files.autoSave": "afterDelay",
    "code-runner.runInTerminal": true,
    "code-runner.saveFileBeforeRun": true,
    "code-runner.executorMapByGlob": {
        "pom.xml": "cd $dir && mvn clean package"
    },
    "code-runner.executorMap": {
        "javascript": "node",
        "java": "cd $dir && javac $fileName && java $fileNameWithoutExt",
        "c": "cd $dir && gcc $fileName -o $fileNameWithoutExt && $dir$fileNameWithoutExt",
        "zig": "zig run",
        // "cpp": "cd $dir && g++ $fileName -o $fileNameWithoutExt && $dir$fileNameWithoutExt",
        // "cpp": "cd $dir && g++ -std=c++20 $fileName -o $fileNameWithoutExt && $dir$fileNameWithoutExt",
        "cpp": "cd $dir && (if not exist .\\bin mkdir .\\bin) && g++ -std=c++20 $fileName -o .\\bin\\$fileNameWithoutExt && .\\bin\\$fileNameWithoutExt",

        "objective-c": "cd $dir && gcc -framework Cocoa $fileName -o $fileNameWithoutExt && $dir$fileNameWithoutExt",
        "php": "php",
        "python": "python -u",
        "perl": "perl",
        "perl6": "perl6",
        "ruby": "ruby",
        "go": "go run",
        "lua": "lua",
        "groovy": "groovy",
        "powershell": "powershell -ExecutionPolicy ByPass -File",
        "bat": "cmd /c",
        "shellscript": "bash",
        "fsharp": "fsi",
        "csharp": "scriptcs",
        "vbscript": "cscript //Nologo",
        "typescript": "ts-node",
        "coffeescript": "coffee",
        "scala": "scala",
        "swift": "swift",
        "julia": "julia",
        "crystal": "crystal",
        "ocaml": "ocaml",
        "r": "Rscript",
        "applescript": "osascript",
        "clojure": "lein exec",
        "haxe": "haxe --cwd $dirWithoutTrailingSlash --run $fileNameWithoutExt",
        "rust": "cd $dir && rustc $fileName && $dir$fileNameWithoutExt",
        "racket": "racket",
        "scheme": "csi -script",
        "ahk": "autohotkey",
        "autoit": "autoit3",
        "dart": "dart",
        "pascal": "cd $dir && fpc $fileName && $dir$fileNameWithoutExt",
        "d": "cd $dir && dmd $fileName && $dir$fileNameWithoutExt",
        "haskell": "runghc",
        "nim": "nim compile --verbosity:0 --hints:off --run",
        "lisp": "sbcl --script",
        "kit": "kitc --run",
        "v": "v run",
        "sass": "sass --style expanded",
        "scss": "scss --style expanded",
        "less": "cd $dir && lessc $fileName $fileNameWithoutExt.css",
        "FortranFreeForm": "cd $dir && gfortran $fileName -o $fileNameWithoutExt && $dir$fileNameWithoutExt",
        "fortran-modern": "cd $dir && gfortran $fileName -o $fileNameWithoutExt && $dir$fileNameWithoutExt",
        "fortran_fixed-form": "cd $dir && gfortran $fileName -o $fileNameWithoutExt && $dir$fileNameWithoutExt",
        "fortran": "cd $dir && gfortran $fileName -o $fileNameWithoutExt && $dir$fileNameWithoutExt",
        "sml": "cd $dir && sml $fileName",
        "mojo": "mojo run",
        "erlang": "escript",
        "spwn": "spwn build",
        "pkl": "cd $dir && pkl eval -f yaml $fileName -o $fileNameWithoutExt.yaml",
        "gleam": "gleam run -m $fileNameWithoutExt"
    },
    "terminal.integrated.defaultProfile.windows": "Command Prompt",
    "code-runner.executorMapByFileExtension": {
        
        ".vb": "cd $dir && vbc /nologo $fileName && $dir$fileNameWithoutExt",
        ".vbs": "cscript //Nologo",
        ".scala": "scala",
        ".jl": "julia",
        ".cr": "crystal",
        ".ml": "ocaml",
        ".zig": "zig run",
        ".exs": "elixir",
        ".hx": "haxe --cwd $dirWithoutTrailingSlash --run $fileNameWithoutExt",
        ".rkt": "racket",
        ".scm": "csi -script",
        ".ahk": "autohotkey",
        ".au3": "autoit3",
        ".kt": "cd $dir && kotlinc $fileName -include-runtime -d $fileNameWithoutExt.jar && java -jar $fileNameWithoutExt.jar",
        ".kts": "kotlinc -script",
        ".dart": "dart",
        ".pas": "cd $dir && fpc $fileName && $dir$fileNameWithoutExt",
        ".pp": "cd $dir && fpc $fileName && $dir$fileNameWithoutExt",
        ".d": "cd $dir && dmd $fileName && $dir$fileNameWithoutExt",
        ".hs": "runhaskell",
        ".nim": "nim compile --verbosity:0 --hints:off --run",
        ".csproj": "dotnet run --project",
        ".fsproj": "dotnet run --project",
        ".lisp": "sbcl --script",
        ".kit": "kitc --run",
        ".v": "v run",
        ".vsh": "v run",
        ".sass": "sass --style expanded",
        ".cu": "cd $dir && nvcc $fileName -o $fileNameWithoutExt && $dir$fileNameWithoutExt",
        ".ring": "ring",
        ".sml": "cd $dir && sml $fileName",
        ".mojo": "mojo run",
        ".erl": "escript",
        ".spwn": "spwn build",
        ".pkl": "cd $dir && pkl eval -f yaml $fileName -o $fileNameWithoutExt.yaml",
        ".gleam": "gleam run -m $fileNameWithoutExt"
    },
    "terminal.integrated.enableMultiLinePasteWarning": "never",
    "C_Cpp.intelliSenseEngine": "disabled",
    "security.workspace.trust.untrustedFiles": "open",
    "window.commandCenter": false,
    "window.menuBarVisibility": "compact",
    "workbench.layoutControl.enabled": false,
    "[python]": {
        "editor.defaultFormatter": "eeyore.yapf"
    },
    "workbench.colorTheme": "Monokai",
}
```