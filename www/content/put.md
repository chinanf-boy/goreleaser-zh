---
title: HTTP Put
series: customization
hideFromIndex: true
weight: 120
---
GoReleaser支持使用简单的HTTP PUT请求构建和推送工件到HTTP服务器.

## 这个怎么运作

您可以声明多个Put实例.您生成的所有二进制文件`builds`部分将被推送到每个配置的Put.

如果您只有一个Put实例,则配置就像添加上传目标和用户名一样简单`.goreleaser.yml`文件:

```yaml
puts:
  - name: production
    target: http://some.server/some/path/example-repo-local/{{ .ProjectName }}/{{ .Version }}/
    username: goreleaser
```

先决条件:

-   接受PUT请求的HTTP服务器
-   用户+密码,用于使用PUT请求上传工件(如果服务器需要)

### 目标

该`target`是将工件上传到的URL(*无*工件的名称).

一个示例配置`goreleaser`在上传模式下`binary`与目标可以看起来像

```yaml
- mode: binary
  target: 'http://some.server/some/path/example-repo-local/{{ .ProjectName }}/{{ .Version }}/{{ .Os }}/{{ .Arch }}{{ if .Arm }}{{ .Arm }}{{ end }}'
```

并将导致发送HTTP PUT请求`http://some.server/some/path/example-repo-local/goreleaser/1.0.0/Darwin/x86_64/goreleaser`.

支持的变量:

-   版
-   标签
-   项目名
-   口
-   拱
-   臂

> **警告**:变量`Os`,`Arch`和`Arm`仅在上传模式下受支持`binary`.

### 用户名

您配置的用户名必须对您的HTTP服务器有效.

您可以在配置文件中设置用户名,如上所示,也可以从环境变量中读取.配置的HTTP服务器名称将用于构建环境变量名称.这样我们就支持多个实例的auth.这也意味着`name`每个配置的实例需要每个goreleaser配置是唯一的.

环境变量的名称将是`PUT_NAME_USERNAME`.如果您的实例已命名`production`,您可以将用户名存储在环境变量中`PUT_PRODUCTION_USERNAME`.该名称将转换为大写.

如果在配置文件中找到已配置的用户名,则根本不使用环境变量.

### 密码

密码将存储在环境变量中.将使用配置的HTTP服务器名称.这样我们就支持多个实例的auth.这也意味着`name`每个配置的实例需要每个goreleaser配置是唯一的.

环境变量的名称将是`PUT_NAME_SECRET`.如果您的实例已命名`production`,您需要将秘密存储在环境变量中`PUT_PRODUCTION_SECRET`.该名称将转换为大写.

### 服务器认证

您可以对您的TLS服务器进行身份验证,在您的put配置中添加受信任的X.509证书链.

可信证书链将用于验证服务器证书.

您可以使用以下命令设置可信证书链`trusted_certificates`在YAML文字块上设置带有PEM编码证书的put部分,如下所示:

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
  # You can have multiple Put instances.
  -
    # Unique name of your Put instance. Used to identify the instance.
    name: production
    # Upload mode. Valid options are `binary` and `archive`.
    # If mode is `archive`, variables _Os_, _Arch_ and _Arm_ for target name are not supported.
    # In that case these variables are empty.
    # Default is `archive`.
    mode: archive
    # URL to be used as target of the HTTP PUT request
    target: https://some.server/some/path/example-repo-local/{{ .ProjectName }}/{{ .Version }}/
    # User that will be used for the deployment
    username: deployuser
    # An optional header you can use to tell GoReleaser to pass the artifact's
    # SHA256 checksum withing the upload request.
    # Default is empty.
    checksum_header: -X-SHA256-Sum
    # Upload checksums (defaults to false)
    checksum: true
    # Upload signatures (defaults to false)
    signature: true
    # Certificate chain used to validate server certificates
    trusted_certificates: |
      -----BEGIN CERTIFICATE-----
      MIIDrjCCApagAwIBAgIIShr2zchZo+8wDQYJKoZIhvcNAQENBQAwNTEXMBUGA1UE
      ...(edited content)...
      TyzMJasj5BPZrmKjJb6O/tOtEIJ66xPSBTxPShkEYHnB7A==
      -----END CERTIFICATE-----
```

这些设置应该允许您将工件推送到多个HTTP服务器.
