---
title: Docker
series: customization
hideFromIndex: true
weight: 140
---
以来[v0.31.0](https://github.com/goreleaser/goreleaser/releases/tag/v0.31.0),GoReleaser支持构建和推送Docker镜像.

## 这个怎么运作

您可以声明多个Docker镜像.它们将与您生成的二进制文件进行匹配`builds`部分.

如果你只有一个`build`设置,配置就像添加图像名称一样简单`.goreleaser.yml`文件:

docker图像声明支持模板.了解有关的更多信息[名称模板引擎](/templates).

```yaml
dockers:
  - image_templates:
    - user/repo
```

你还需要创建一个`Dockerfile`在项目的根文件夹中:

```dockerfile
FROM scratch
COPY mybin /
ENTRYPOINT ["/mybin"]
```

此配置将构建并推送名为的Docker镜像`user/repo:tagname`.

> **注意**:请注意,在docker构建阶段没有构建任何go文件,我们只是将二进制文件复制到`scratch`图像和设置入口点.

## 定制

当然,你可以自定义很多东西:

```yaml
# .goreleaser.yml
dockers:
  # You can have multiple Docker images.
  -
    # GOOS of the built binary that should be used.
    goos: linux
    # GOARCH of the built binary that should be used.
    goarch: amd64
    # GOARM of the built binary that should be used.
    goarm: ''
    # Name of the built binary that should be used.
    binary: mybinary
    # Templates of the Docker image names.
    image_templates:
    - "myuser/myimage:latest"
    - "myuser/myimage:{{ .Tag }}"
    - "myuser/myimage:{{ .Tag }}-{{ .Env.GO_VERSION }}"
    - "myuser/myimage:v{{ .Major }}"
    - "gcr.io/myuser/myimage:latest"
    # Skips the docker push. Could be useful if you also do draft releases.
    # Defaults to false.
    skip_push: false
    # Path to the Dockerfile (from the project root).
    dockerfile: Dockerfile 
    # Template of the docker build flags.
    build_flag_templates:
    - "--label=org.label-schema.schema-version=1.0"
    - "--label=org.label-schema.version={{.Version}}"
    - "--label=org.label-schema.name={{.ProjectName}}"
    - "--build-arg=FOO={{.ENV.Bar}}"
    # If your Dockerfile copies files other than the binary itself,
    # you should list them here as well.
    extra_files:
    - config.yml
```

> 了解有关的更多信息[名称模板引擎](/templates).

这些设置应该允许您生成多个Docker镜像,例如,使用多个`FROM`语句,以及为项目中的每个二进制文件生成一个图像.

## 通用图像名称

某些用户可能希望将其图像名称保持为通用名称.这可以通过在定义中添加模板语言来实现:

```yaml
# .goreleaser.yml
project: foo
dockers:
  -
    binary: mybinary
    image_templates:
    - "myuser/{{.ProjectName}}"
```

这将构建并公开以下图像:

-   `myuser/foo`

> 了解有关的更多信息[名称模板引擎](/templates).

## 保持docker图像更新当前主要版本

某些用户可能希望在推出docker标签的版本时使用`:v1`,`:v1.6`,`:v1.6.4`和`:latest`什么时候`v1.6.4`(例如)已建成.这可以通过使用多个来完成`image_templates`:

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

这将构建并发布以下图像:

-   `myuser/myimage:v1.6.4`
-   `myuser/myimage:v1`
-   `myuser/myimage:v1.6`
-   `myuser/myimage:latest`

通过这些设置,您可以使用多个标签推送几个不同的泊坞窗图像.

> 了解有关的更多信息[名称模板引擎](/templates).

## 发布到多个docker注册表

某些用户可能希望将图像推送到多个docker注册表.这可以通过使用多个来完成`image_templates`:

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

这将构建并发布以下图像`docker.io`和`gcr.io`:

-   `myuser/myimage:v1.6.4`
-   `myuser/myimage:latest`

## 应用docker构建标志

可以使用构建标志`build_flag_templates`.标志必须是有效的docker build标志.

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

> 了解有关的更多信息[名称模板引擎](/templates).
