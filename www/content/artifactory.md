---
title: Artifactory-存档工厂
series: customization
hideFromIndex: true
weight: 120
---

至[v0.38.0](https://github.com/goreleaser/goreleaser/releases/tag/v0.38.0)以来,GoReleaser支持构建和推送存档到Artifactory.

## 这个怎么运作

您可以声明多个Artifactory实例。您`builds`部分生成的所有二进制文件，都将被推送到每个配置的Artifactory.

如果您只有一个Artifactory实例，则配置就像添加上传目标和用户名一样简单`.goreleaser.yml`文件:

```yaml
artifactories:
  - name: production
    target: http://<Your-Instance>:8081/artifactory/example-repo-local/{{ .ProjectName }}/{{ .Version }}/
    username: goreleaser
```

先决条件:

-   正在运行的Artifactory实例
-   用户+密码/ API密钥,用于上传存档

### 目标-target

该`target`是，将存档上传到的URL(*没有*存档的名称).

在上传`binary`到目标模式下，一个`goreleaser`示例配置，可以看起来像

```yaml
- mode: binary
  target: 'http://artifacts.company.com:8081/artifactory/example-repo-local/{{ .ProjectName }}/{{ .Version }}/{{ .Os }}/{{ .Arch }}{{ if .Arm }}{{ .Arm }}{{ end }}'
```

并将导致最终部署,如`http://artifacts.company.com:8081/artifactory/example-repo-local/goreleaser/1.0.0/Darwin/x86_64/goreleaser`.

支持的变量:

- **Version**
- **Tag**
- **ProjectName**
- **Os**
- **Arch**
- **Arm**

*注意*:变量 _Os_, _Arch_ 和 _Arm_ 仅在上传`binary`模式下，受支持.

### 用户名

您配置的用户名需要根据您的Artifactory进行身份验证.

您可以在配置文件中设置用户名,如上所示,也可以从环境变量中读取.配置的Artifactory实例名称，将用于构建环境变量名称。这样我们就支持多个实例的auth。这也意味着每个goreleaser配置中的每个配置的实例`name`是唯一的.

环境变量的名称将是`ARTIFACTORY_NAME_USERNAME`。如果您的实例已命名`production`,您可以将用户名存储在环境变量中`ARTIFACTORY_PRODUCTION_USERNAME`。该名称将转换为 *大写*.

如果在配置文件中，找到已配置的用户名,则根本不使用环境变量.

### 密码/ API密钥

密码或API密钥，将存储在环境变量中。使用您的Artifactory实例的已配置名称。通过这种方式,我们支持多个实例的auth.这也意味着每个goreleaser配置中的每个配置的实例`name`是唯一的.

环境变量的名称将是`ARTIFACTORY_NAME_SECRET`.如果您的实例已命名`production`,您需要将密码存储在环境变量中`ARTIFACTORY_PRODUCTION_SECRET`。该名称将转换为大写.

### 服务器认证

您可以对您的Artifactory TLS服务器进行身份验证，在您的配置中添加X.509可信证书链.

可信证书链，用于验证服务器证书.

您可以使用`trusted_certificates`设置artifactory部分的可信证书链，在YAML字段区块上使用PEM编码证书,如下所示:

```yaml
puts:
  - name: "some artifactory server with a private TLS certificate"
    #...(other settings)...
    trusted_certificates: |
      -----BEGIN CERTIFICATE-----
      MIIDrjCCApagAwIBAgIIShr2zchZo+8wDQYJKoZIhvcNAQENBQAwNTEXMBUGA1UE
      ...(edited content)...
      TyzMJasj5BPZrmKjJb6O/tOtEIJ66xPSBTxPShkEYHnB7A==
      -----END CERTIFICATE-----
      -----BEGIN CERTIFICATE-----
      MIIDrjCCApagAwIBAgIIShr2zchZo+8wDQYJKoZIhvcNAQENBQAwNTEXMBUGA1UE
      ...(edited content)...
      TyzMJasj5BPZrmKjJb6O/tOtEIJ66xPSBTxPShkEYHnB7A==
      -----END CERTIFICATE-----
```

## 定制

当然,你可以自定义很多东西:

```yaml
# .goreleaser.yml
artifactories:
  # 您可以拥有多个Artifactory实例。
  -
    # artifactory实例的唯一名称。 用于标识实例
    name: production
    # 上传模式。 有效选项是`binary`和`archive`。
    # 如果mode是`archive`，则不支持目标名称的 _Os_，_ Arch_ 和 _Arm_ 变量。
    # 在这种情况下，这些变量是空的。
    # 默认是`archive`。
    mode: archive
    # 您的Artifactory实例的URL + 要部署到的路径
    target: http://artifacts.company.com:8081/artifactory/example-repo-local/{{ .ProjectName }}/{{ .Version }}/
    # 将用于部署的用户
    username: deployuser
    # 上传校验和（默认为false）
    checksum: true
    # 上传签名（默认为false）
    signature: true
    # 用于验证服务器证书的证书链
    trusted_certificates: |
      -----BEGIN CERTIFICATE-----
      MIIDrjCCApagAwIBAgIIShr2zchZo+8wDQYJKoZIhvcNAQENBQAwNTEXMBUGA1UE
      ...(edited content)...
      TyzMJasj5BPZrmKjJb6O/tOtEIJ66xPSBTxPShkEYHnB7A==
      -----END CERTIFICATE-----
```

这些设置应该能让您，将存档推送到多个Artifactories.
