---
title: Signing-签名
series: customization
hideFromIndex: true
weight: 60
---
GoReleaser可以对部分或全部生成的存档进行签名。签名可确保您自己生成的存档与您的公共签名密钥，您的用户可以验证他们生成的签名.

签名与校验文件结合使用,通常只对签校验文件就足够了.

默认配置是，使用[GnuPG](https://www.gnupg.org/)的校验文件，创建签名和你的默认密钥。要启用签名,只需添加

```yaml
# goreleaser.yml
sign:
   artifacts: checksum
```

要自定义签名流程,您可以使用以下选项:

```yml
# .goreleaser.yml
sign:
  #  signature 文件名称.
  # '${artifact}' 是应 sign 的存档路径.
  #
  # signature: "${artifact}.sig"

  # signature 命令路径
  #
  # cmd: gpg

  # 上面 command 的参数
  #
  # 使用特定 key，去sign 
  # args: ["-u", "<key id, fingerprint, email, ...>", "--output", "${signature}", "--detach-sign", "${artifact}"]
  #
  # args: ["--output", "${signature}", "--detach-sign", "${artifact}"]


  # 哪些要 sign
  #
  #   checksum: 只有 checksum 文件(s)
  #   all:      所有
  #   none:     不 signing
  #
  # artifacts: none
```
