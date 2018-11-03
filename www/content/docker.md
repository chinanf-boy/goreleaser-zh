---
title: Docker
series: customization
hideFromIndex: true
weight: 140
---
至[v0.31.0](https://github.com/goreleaser/goreleaser/releases/tag/v0.31.0)以来,GoReleaser支持构建和推送Docker镜像.

## 这个怎么运作

您可以声明多个Docker镜像。它们将与您`builds`部分生成的二进制文件进行匹配.

如果你只有一个`build`设置，配置就像添加镜像名称到你`.goreleaser.yml`文件一样简单:

docker镜像声明支持模板。了解有关[命名模板引擎](/templates)的更多信息.

```yaml
dockers:
  - image_templates:
    - user/repo
```

你还需要在项目的根文件夹中，创建一个`Dockerfile`:

```dockerfile
FROM scratch
COPY mybin /
ENTRYPOINT ["/mybin"]
```

此配置将构建，并推送名为的Docker镜像`user/repo:tagname`.

> **注意**:请注意,在docker构建阶段，没有构建任何go文件,我们只是将二进制文件复制到`scratch`镜像和设置入口点-**ENTRYPOINT**.

## 定制

当然,你可以自定义很多东西:

```yaml
# .goreleaser.yml
dockers:
  # 您可以拥有多个Docker镜像。
  -
    # 应该使用的构建二进制文件的GOOS。
    goos: linux
    # 应该使用的构建二进制文件的GOARCH。
    goarch: amd64
    # 应该使用的构建二进制文件的GOARM。
    goarm: ''
    # 应使用的构建二进制文件的名称。
    binary: mybinary
    # Docker镜像名称的模板。
    image_templates:
    - "myuser/myimage:latest"
    - "myuser/myimage:{{ .Tag }}"
    - "myuser/myimage:{{ .Tag }}-{{ .Env.GO_VERSION }}"
    - "myuser/myimage:v{{ .Major }}"
    - "gcr.io/myuser/myimage:latest"
    # 跳过docker推送。 如果你也有草稿版本可能会有用。
    # 默认为false。
    skip_push: false
    # Dockerfile的路径（来自项目根目录）。
    dockerfile: Dockerfile 
    # docker构建参数的模板。
    build_flag_templates:
    - "--label=org.label-schema.schema-version=1.0"
    - "--label=org.label-schema.version={{.Version}}"
    - "--label=org.label-schema.name={{.ProjectName}}"
    - "--build-arg=FOO={{.ENV.Bar}}"
    # 如果您要Dockerfile复制二进制文件以外的文件，
    # 你也应该在这里列出它们。
    extra_files:
    - config.yml
```

> 了解有关[命名模板引擎](/templates)的更多信息.

这些设置应该允许您生成多个Docker镜像，例如,使用多个`FROM`语句,以及为项目中的每个二进制文件生成一个镜像.

## 通用镜像名称

某些用户可能希望将其镜像名称保持为通用名称。这可以通过在定义中添加模板语言来实现:

```yaml
# .goreleaser.yml
project: foo
dockers:
  -
    binary: mybinary
    image_templates:
    - "myuser/{{.ProjectName}}"
```

这将构建，并公开以下镜像:

-   `myuser/foo`

> 了解有关[命名模板引擎](/templates)的更多信息.

## 当前主要版本，docker镜像就保持更新，

某些用户可能希望当`v1.6.4`(例如)已建成，之后在push docker标签版本，能使用`:v1`,`:v1.6`,`:v1.6.4`和`:latest`。这可以通过使用多个`image_templates`来完成:

```yaml
# .goreleaser.yml
dockers:
  -
    binary: mybinary
    image_templates:
    - "myuser/myimage:{{ .Tag }}"
    - "myuser/myimage:v{{ .Major }}"
    - "myuser/myimage:v{{ .Major }}.{{ .Minor }}"
    - "myuser/myimage:latest"
```

这将构建，并发布以下镜像:

-   `myuser/myimage:v1.6.4`
-   `myuser/myimage:v1`
-   `myuser/myimage:v1.6`
-   `myuser/myimage:latest`

通过这些设置,您可以使用多个标签推送几个不同的docker镜像.

> 了解有关[命名模板引擎](/templates)的更多信息.

## 发布到多个docker注册表

某些用户可能希望，将镜像推送到多个docker注册表。这可以通过使用多个`image_templates`来完成:

```yaml
# .goreleaser.yml
dockers:
  -
    binary: mybinary
    image_templates:
    - "docker.io/myuser/myimage:{{ .Tag }}"
    - "docker.io/myuser/myimage:latest"
    - "gcr.io/myuser/myimage:{{ .Tag }}"
    - "gcr.io/myuser/myimage:latest"
```

这将构建，并发布以下镜像到`docker.io`和`gcr.io`:

-   `myuser/myimage:v1.6.4`
-   `myuser/myimage:latest`

## 应用docker构建参数

可以使用`build_flag_templates`构建参数。参数必须是有效的docker build参数.

```yaml
# .goreleaser.yml
dockers:
  -
    binary: mybinary
    image_templates:
        - "myuser/myimage"
    build_flag_templates:
    - "--label=org.label-schema.schema-version=1.0"
    - "--label=org.label-schema.version={{.Version}}"
    - "--label=org.label-schema.name={{.ProjectName}}"
```

这将执行以下命令:

```bash
docker build -t myuser/myimage . \
  --label=org.label-schema.schema-version=1.0 \
  --label=org.label-schema.version=1.6.4 \
  --label=org.label-schema.name=mybinary"
```

> 了解有关[命名模板引擎](/templates)的更多信息.
