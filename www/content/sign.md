---
title: Signing
series: customization
hideFromIndex: true
weight: 60
---
GoReleaser可以对部分或全部生成的工件进行签名.签名可确保您自己生成工件,并且您的用户可以通过将生成的签名与您的公共签名密钥进行比较来验证.

签名与校验和文件结合使用,通常只对签署校验和文件就足够了.

默认配置为使用的校验和文件创建分离签名[GnuPG的](https://www.gnupg.org/)和你的默认密钥.要启用签名,只需添加

```yaml
# goreleaser.yml
sign:
   artifacts: checksum
```

要自定义签名管道,您可以使用以下选项:

```yml
# .goreleaser.yml
sign:
  # name of the signature file.
  # '${artifact}' is the path to the artifact that should be signed.
  #
  # signature: "${artifact}.sig"

  # path to the signature command
  #
  # cmd: gpg

  # command line arguments for the command
  #
  # to sign with a specific key use
  # args: ["-u", "<key id, fingerprint, email, ...>", "--output", "${signature}", "--detach-sign", "${artifact}"]
  #
  # args: ["--output", "${signature}", "--detach-sign", "${artifact}"]


  # which artifacts to sign
  #
  #   checksum: only checksum file(s)
  #   all:      all artifacts
  #   none:     no signing
  #
  # artifacts: none
```
