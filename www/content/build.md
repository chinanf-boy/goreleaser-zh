---
title: Builds
series: customization
hideFromIndex: true
weight: 30
---
可以通过多种方式自定义构建.您可以指定哪个`GOOS`,`GOARCH`和`GOARM`构建二进制文件(goreleaser将生成所有组合的矩阵),您可以更改二进制文件的名称,标志,环境变量,挂钩等.

这是一个评论`builds`指定了所有字段的部分:

```yml
# .goreleaser.yml
builds:
  # You can have multiple builds defined as a yaml list
  -
    # Path to main.go file or main package.
    # Default is `.`.
    main: ./cmd/main.go

    # Name template for the binary final name.
    # Default is the name of the project directory.
    binary: program

    # Set flags for custom build tags.
    # Default is empty.
    flags:
      - -tags=dev

    # Custom asmflags templates.
    # Default is empty.
    asmflags:
      - -D mysymbol
      - all=-trimpath={{.Env.GOPATH}}

    # Custom gcflags templates.
    # Default is empty.
    gcflags:
      - all=-trimpath={{.Env.GOPATH}}
      - ./dontoptimizeme=-N

    # Custom ldflags templates.
    # Default is `-s -w -X main.version={{.Version}} -X main.commit={{.Commit}} -X main.date={{.Date}}`.
    ldflags:
     - -s -w -X main.build={{.Version}}
     - ./usemsan=-msan

    # Custom environment variables to be set during the builds.
    # Default is empty.
    env:
      - CGO_ENABLED=0

    # GOOS list to build for.
    # For more info refer to: https://golang.org/doc/install/source#environment
    # Defaults are darwin and linux.
    goos:
      - freebsd
      - windows

    # GOARCH to build for.
    # For more info refer to: https://golang.org/doc/install/source#environment
    # Defaults are 386 and amd64.
    goarch:
      - amd64
      - arm
      - arm64

    # GOARM to build for when GOARCH is arm.
    # For more info refer to: https://golang.org/doc/install/source#environment
    # Default is only 6.
    goarm:
      - 6
      - 7

    # List of combinations of GOOS + GOARCH + GOARM to ignore.
    # Default is empty.
    ignore:
      - goos: darwin
        goarch: 386
      - goos: linux
        goarch: arm
        goarm: 7

    # Hooks can be used to customize the final binary,
    # for example, to run generators.
    # Default is both hooks empty.
    hooks:
      pre: rice embed-go
      post: ./script.sh
```

> 了解有关的更多信息[名称模板引擎](/templates).

## 将环境变量传递给ldflags

你可以通过使用来做到这一点`{{ .Env.VARIABLE_NAME }}`在模板中,例如:

```yaml
builds:
  - ldflags:
   - -s -w -X "main.goversion={{.Env.GOVERSION}}"
```

然后你可以运行:

```console
GOVERSION=$(go version) goreleaser
```

## 去模块

如果你使用Go 1.11和go模块或vgo,当GoReleaser运行时,它可能会尝试下载依赖项.由于多个构建并行运行,因此很可能会失败.

你可以通过运行解决这个问题`go mod download`在打电话之前`goreleaser`或者添加一个[钩][]这样做对你的`.goreleaser.yaml`文件:

```yaml
before:
  hooks:
  - go mod download
# rest of the file...
```

[hook]: /hooks
