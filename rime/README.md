## 文件(夹)定义

- `backgrounds/`: 同文 (trime) **主题图片**文件。
- `build/`: **编译结果**。部署成功后，会在此处生成*编译结果*文件，输入法程序运行时读取的也是这里的文件。
- `fonts/`: **字体**文件。
- `opencc/`: [OpenCC](https://github.com/BYVoid/OpenCC) **字形转换**配置及字典文件。
- `sync/`: **同步**文件夹。*备份*方案&词库及相关配置文件，导出的用户词典也存放在此处。
- `<词库id>.userdb/`: 用户**词库**。存储用户输入习惯。
- `default.yaml`: **全局配置**文件。Rime 各个平台通用的全局参数 (*功能键定义*、*按键捆绑*、*方案列表*、*候选条数*……)。
- `installation.yaml`: **安装信息**。输入法程序在首次运行及升级后写入*安装*、*升级时间*、*程序版本*等。
- `<方案id>.schema.yaml`: **输入方案**文件。
- `<词库id>.dict.yaml`: **词库**文件。
- `<词库id>.txt`: **文本格式的词库**文件。
- `<配置文件id>.custom.yaml`: **补丁**。用于配置文件 `<配置文件id>.schema.yaml` 或 `<配置文件id>.yaml` 的补丁。
- `symbols.yaml`: 扩充的**特殊符号**。提供了比`default.yaml`更为丰富的特殊符号。
- `<主题id>.trime.yaml`: 同文 (trime) **主题**文件。
- `user.yaml`: 用户**状态信息**。用来保存当前所使用的*方案id*，以及各种*开关的状态*。

## 一些资料

- [Rime wiki](https://github.com/rime/home/wiki/)
- [Rime 官网](https://rime.im/)
- [Rime 贴吧](https://tieba.baidu.com/f?kw=rime&ie=utf-8)
- [TRime wiki](https://github.com/osfans/trime/wiki/)
- [东风破](https://github.com/rime/plum)
- [致第一次安装 RIME 的你](https://tieba.baidu.com/p/3288634121?pn=1)
- [佛振教你写 Rime 输入方案之辅助码的作法](https://tieba.baidu.com/p/2094178562?pn=1)