---
title: 构建
series: customization
hideFromIndex: true
weight: 30
---
可以通过多种方式自定义构建.您可以指定哪个`GOOS`,`GOARCH`和`GOARM`构建二进制文件(goreleaser将生成所有组合的矩阵)，您可以更改二进制文件的名称,命令参数,环境变量,钩子等.

这是一个`builds`注释，指定了所有字段部分:

```yml
# .goreleaser.yml
builds:
  # 你能用 多个 构建 定义，yaml格式
  -
    #  main.go 文件或者主包的路径 .
    # 默认 `.`.
    main: ./cmd/main.go

    # 命名 最终二进制文件的模版.
    # 默认是 项目目录的名称.
    binary: program

    # 设置 命令参数到自定义的 build tags.
    # 默认是 空.
    flags:
      - -tags=dev

    # Custom asmflags templates.
    # 默认是 空.
    asmflags:
      - -D mysymbol
      - all=-trimpath={{.Env.GOPATH}}

    # Custom gcflags templates.
    # 默认是 空.
    gcflags:
      - all=-trimpath={{.Env.GOPATH}}
      - ./dontoptimizeme=-N

    # Custom ldflags templates.
    # 默认是 `-s -w -X main.version={{.Version}} -X main.commit={{.Commit}} -X main.date={{.Date}}`.
    ldflags:
     - -s -w -X main.build={{.Version}}
     - ./usemsan=-msan

    # 运行构建期间的环境变量.
    # 默认是 空.
    env:
      - CGO_ENABLED=0

    # GOOS 构建列表r.
    # 更多内容，请参考: https://golang.org/doc/install/source#environment
    # 默认为 darwin 和 linux.
    goos:
      - freebsd
      - windows

    # GOARCH 构建系结构.
    # 更多内容，请参考: https://golang.org/doc/install/source#environment
    # 默认为 386 和 amd64.
    goarch:
      - amd64
      - arm
      - arm64

    # GOARM 要构建的 ， 若GOARCH 是 arm时.
    # 更多内容，请参考: https://golang.org/doc/install/source#environment
    # 默认是 只有 6.
    goarm:
      - 6
      - 7

    #  GOOS + GOARCH + GOARM 组合忽略列表.
    # 默认是 空.
    ignore:
      - goos: darwin
        goarch: 386
      - goos: linux
        goarch: arm
        goarm: 7

    # Hooks 可用于 自定义最终二进制文件,
    # 例如, 运行 generators.
    # 默认 都为 空.
    hooks:
      pre: rice embed-go
      post: ./script.sh
```

> 了解有关[命名模板引擎](/templates)的更多信息。

## 将环境变量传递给ldflags

你可以通过在模板中使用`{{ .Env.VARIABLE_NAME }}`来做到这一点,例如:

```yaml
builds:
  - ldflags:
   - -s -w -X "main.goversion={{.Env.GOVERSION}}"
```

然后你可以运行:

```console
GOVERSION=$(go version) goreleaser
```

## Go模块

如果你使用Go 1.11的**go模块**或**vgo**，当GoReleaser运行时,它可能会尝试下载依赖项。由于多个构建并行运行,因此很可能会失败.

你可以在启动`goreleaser`之前，通过运行`go mod download`解决这个问题，或者添加一个[hook][]，像这样`.goreleaser.yaml`文件:

```yaml
before:
  hooks:
  - go mod download
# rest of the file...
```

[hook]: /hooks
