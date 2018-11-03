---
title: HTTP Put
series: customization
hideFromIndex: true
weight: 120
---

GoReleaser支持构建和，只使用简单的HTTP PUT请求推送存档到HTTP服务器.

## 这个怎么运作

您可以声明多个Put实例。您`builds`部分生成的所有二进制文件，将被推送到每个配置的Put.

如果您只有一个Put实例,则配置就像添加上传目标和用户名到`.goreleaser.yml`文件一样简单:

```yaml
puts:
  - name: production
    target: http://some.server/some/path/example-repo-local/{{ .ProjectName }}/{{ .Version }}/
    username: goreleaser
```

先决条件:

-   接受PUT请求的HTTP服务器
-   用户+密码,用于使用PUT请求上传存档(如果服务器需要)

### 目标-target

该`target`是将存档上传到的URL(*没有*存档的名称).

在上传`binary`与目标模式下，一个`goreleaser`示例配置，可以看起来像

```yaml
- mode: binary
  target: 'http://some.server/some/path/example-repo-local/{{ .ProjectName }}/{{ .Version }}/{{ .Os }}/{{ .Arch }}{{ if .Arm }}{{ .Arm }}{{ end }}'
```

将导致发送HTTP PUT请求`http://some.server/some/path/example-repo-local/goreleaser/1.0.0/Darwin/x86_64/goreleaser`.

支持的变量:

- **Version**
- **Tag**
- **ProjectName**
- **Os**
- **Arch**
- **Arm**

> **警告**:变量`Os`,`Arch`和`Arm`仅在上传`binary`模式下受支持.

### 用户名

您配置的用户名必须对您的HTTP服务器有效.

您可以在配置文件中设置用户名，如上所示，也可以从环境变量中读取。你配置的HTTP服务器名称，将用于构建环境变量名称。这样我们就支持多个实例的auth。这也意味着每个goreleaser配置的每个配置的实例`name`是唯一的.

环境变量的名称将是`PUT_NAME_USERNAME`.如果您的实例已命名为`production`，您可以将用户名存储在`PUT_PRODUCTION_USERNAME`环境变量中。该名称将转换为大写。

如果在配置文件中找到已配置的用户名,则根本不使用环境变量.

### 密码

密码将存储在环境变量中.将使用配置的HTTP服务器名称.这样我们就支持多个实例的auth.这也意味着每个goreleaser配置的每个配置的实例`name`是唯一的。

环境变量的名称将是`PUT_NAME_SECRET`.如果您的实例已命名为`production`，您需要将秘密存储在`PUT_PRODUCTION_SECRET`环境变量中。该名称将转换为大写.

### 服务器认证

您可以对您的TLS服务器进行身份验证,在您的put配置中添加X.509可信证书链.

可信证书链，用于验证服务器证书.

您可以使用`trusted_certificates`设置artifactory部分的可信证书链，在YAML字段区块上使用PEM编码证书,如下所示:

```yaml
puts:
  - name: "some HTTP/TLS server"
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
puts:
  # 您可以拥有多个Put实例。
  -
    # Put实例的唯一名称。 用于标识实例。
    name: production
    # 上传模式。 有效选项是`binary`和`archive`。
    # 如果mode是`archive`，则不支持目标名称的变量_Os _，_ Arch_和_Arm_。
    # 在这种情况下，这些变量是空的。
    # 默认是`archive`。
    mode: archive
    # 用作HTTP PUT请求目标的URL
    target: https://some.server/some/path/example-repo-local/{{ .ProjectName }}/{{ .Version }}/
    # 将用于部署的用户
    username: deployuser
    # 您可以使用可选标头，
    # 告诉GoReleaser在上传请求时，传递artifact的SHA256校验。
    # 默认为空。
    checksum_header: -X-SHA256-Sum
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

这些设置应该允许您，将存档推送到多个HTTP服务器.
