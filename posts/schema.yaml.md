> 原文: <https://github.com/LEOYoon-Tsaw/Rime_collections/blob/master/Rime_description.md>

## 开始之前

```yaml
# Rime schema
# encoding: utf-8
```

## 描述档

1. `name:` 方案的显示名偁〔即出现于方案选单中以示人的，通常为中文〕
2. `schema_id:` 方案内部名，在代码中引用此方案时以此名为正，通常由英文、数字、下划线组成
3. `author:` 发明人、撰写者。如果您对方案做出了修改，请保留原作者名，并将自己的名字加在后面
4. `description:` 请简要描述方案历史、码表来源、该方案规则等
5. `dependencies:` 如果本方案依赖于其它方案〔通常来说会依赖其它方案做为反查，抑或是两种或多种方案混用时〕
6. `version:` 版本号，在发布新版前请确保已陞版本号

#### **示例**

```yaml
schema:
name: '苍颉检字法'
schema_id: cangjie6
author:
  - '发明人 朱邦复先生、沈红莲女士'
dependencies:
  - luna_pinyin
  - jyutping
  - zyenpheng
description: |
  第六代仓颉输入法
  码表由雪斋、惜缘和crazy4u整理
version: 0.19
```

## 开关

通常包含以下五个：

1. `ascii_mode` 是中英文转换开关。预设`0`为中文，`1`为英文
2. `full_shape` 是全角符号／半角符号开关。注意，开启全角时英文字母亦为全角。`0`为半角，`1`为全角
3. `extended_charset` 是字符集开关。`0`为 CJK 基本字符集，`1`为 CJK 全字符集
   - 仅`table_translator`可用
4. `simplification` 是转化字开关。一般情况下与上同，`0`为不开启转化，`1`为转化。
5. `ascii_punct` 是中西文标点转换开关，`0`为中文句读，`1`为西文标点。

- 此选项名偁可自定义，亦可添加多套替换用字方案：

```yaml
- name: zh_cn
  states: ['汉字', '汉字']
  reset: 0
```

或

```yaml
- options: [zh_trad, zh_cn, zh_mars]
  states:
    - 字型 → 汉字
    - 字型 → 汉字
    - 字型 → 䕼茡
  reset: 0
```

- `states:` 可不写，如不写则此开关存在但不可见，可由快捷键操作
- `reset:` 设定默认状态〔`reset`可不写，此时切换窗口时不会重置到默认状态〕

#### **示例**

```yaml
switches:
  - name: ascii_mode
    reset: 0
    states: ['中文', '西文']
  - name: full_shape
    states: ['半角', '全角']
  - name: extended_charset
    states: ['通用', '增广']
  - name: simplification
    states: ['汉字', '汉字']
  - name: ascii_punct
    states: ['句读', '符号']
```

## 引擎

> 以下**加粗**项为可细配者，*斜体*者为不常用者

引擎分四组：

### 一、`processors`

- 这批组件处理各类按键消息

1.  `ascii_composer` 处理西文模式及中西文切
2.  **`recognizer`** 与`matcher`搭配，处理符合特定规则的输入码，如网址、反查等`tags`
3.  **`key_binder`** 在特定条件下将按键绑定到其他按键，如重定义逗号、句号为候选翻页、开关快捷键等
4.  **`speller`** 拼写处理器，接受字符按键，编辑输入
5.  **`punctuator`** 句读处理器，将单个字符按键直接映射为标点符号或文字
6.  `selector` 选字处理器，处理数字选字键〔可以换成别的哦〕、上、下候选定位、换页
7.  `navigator` 处理输入栏内的光标移动
8.  `express_editor` 编辑器，处理空格、回车上屏、回退键
9.  _`fluid_editor`_ 句式编辑器，用于以空格断词、回车上屏的【注音】、【语句流】等输入方案，替换`express_editor`
10. _`chord_composer`_ 和弦作曲家或曰并击处理器，用于【宫保拼音】等多键并击的输入方案

### 二、`segmentors`

- 这批组件识别不同内容类型，将输入码分段并加上`tag`

1.  `ascii_segmentor` 标识西文段落〔譬如在西文模式下〕字母直接上屏
2.  `matcher` 配合`recognizer`标识符合特定规则的段落，如网址、反查等，加上特定`tag`
3.  **`abc_segmentor`** 标识常规的文字段落，加上`abc`这个`tag`
4.  `punct_segmentor` 标识句读段落〔键入标点符号用〕加上`punct`这个`tag`
5.  `fallback_segmentor` 标识其他未标识段落
6.  **`affix_segmentor`** 用户自定义`tag`
    - 此项可加载多个实例，后接`@`+`tag`名

### 三、`translators`

- 这批组件翻译特定类型的编码段为一组候选文字

1.  `echo_translator` 没有其他候选字时，回显输入码〔输入码可以`Shift`+`Enter`上屏〕
2.  `punct_translator` 配合`punct_segmentor`转换标点符号
3.  **`table_translator`** 码表翻译器，用于仓颉、五笔等基于码表的输入方案
    - 此项可加载多个实例，后接`@`+翻译器名〔如：`cangjie`、`wubi`等〕
4.  **`script_translator`** 脚本翻译器，用于拼音、粤拼等基于音节表的输入方案
    - 此项可加载多个实例，后接`@`+翻译器名〔如：`pinyin`、`jyutping`等〕
5.  _`reverse_lookup_translator`_ 反查翻译器，用另一种编码方案查码

### 四、`filters`

- 这批组件过滤翻译的结果

1.  **`simplifier`** 用字转换
2.  `uniquifier` 过滤重复的候选字，有可能来自**`simplifier`**
3.  `cjk_minifier` 字符集过滤〔用于`script_translator`，使之支援`extended_charset`开关〕
4.  **`reverse_lookup_filter`** 反查滤镜，以更灵活的方式反查，Rime1.0 后替代 _`reverse_lookup_translator`_
    - 此项可加载多个实例，后接`@`+滤镜名〔如：`pinyin_lookup`、`jyutping_lookup`等〕
5.  **`single_char_filter`** 单字过滤器，如加载此组件，则屏敝词典中的词组〔仅`table_translator`有效〕

#### **示例**

```yaml
# cangjie6.schema.yaml

engine:
  processors:
    - ascii_composer
    - recognizer
    - key_binder
    - speller
    - punctuator
    - selector
    - navigator
    - express_editor
  segmentors:
    - ascii_segmentor
    - matcher
    - affix_segmentor@pinyin
    - affix_segmentor@jyutping
    - affix_segmentor@pinyin_lookup
    - affix_segmentor@jyutping_lookup
    - affix_segmentor@reverse_lookup
    - abc_segmentor
    - punct_segmentor
    - fallback_segmentor
  translators:
    - punct_translator
    - table_translator
    - script_translator@pinyin
    - script_translator@jyutping
    - script_translator@pinyin_lookup
    - script_translator@jyutping_lookup
  filters:
    - simplifier@zh_simp
    - uniquifier
    - cjk_minifier
    - reverse_lookup_filter@middle_chinese
    - reverse_lookup_filter@pinyin_reverse_lookup
    - reverse_lookup_filter@jyutping_reverse_lookup
```

## 细项配置

- 凡`comment_format`、`preedit_format`、`speller/algebra`所用之正则表达式，请参阅[“Perl 正则表达式”](http://www.boost.org/doc/libs/1_49_0/libs/regex/doc/html/boost_regex/syntax/perl_syntax.html)

**引擎中所举之加粗者均可在下方详细描述，格式为：**

```yaml
name:
  branches: configurations
```

或

```yaml
name:
  branches:
    - configurations
```

### 一、`speller`

1. `alphabet:` 定义本方案输入键
2. `initials:` 定义仅作始码之键
3. `finals:` 定义仅作末码之键
4. `delimiter:` 上屏时的音节间分音符
5. `algebra:` 拼写运算规则，由之算出的拼写汇入`prism`中
6. `max_code_length:` 形码最大码长，超过则顶字上屏〔`number`〕
7. `auto_select:` 自动上屏〔`true`或`false`〕
8. `auto_select_pattern:` 自动上屏规则，以正则表达式描述，当输入串可以被匹配时自动顶字上屏。
9. `use_space:` 以空格作输入码〔`true`或`false`〕

- `speller`的演算包含：
  - `xform`: 改写〔不保留原形〕
  - `derive`: 衍生〔保留原形〕
  - `abbrev`: 简拼〔出字优先级较上两组更低〕
  - `fuzz`: 略拼〔此种简拼仅组词，不出单字〕
  - `xlit`: 变换〔适合大量一对一变换〕
  - `erase`: 删除

#### **示例**

```yaml
# luna_pinyin.schema.yaml

speller:
  alphabet: zyxwvutsrqponmlkjihgfedcba
  delimiter: " '"
  algebra:
    - erase/^xx$/
    - abbrev/^([a-z]).+$/$1/
    - abbrev/^([zcs]h).+$/$1/
    - derive/^([nl])ve$/$1ue/
    - derive/^([jqxy])u/$1v/
    - derive/un$/uen/
    - derive/ui$/uei/
    - derive/iu$/iou/
    - derive/([aeiou])ng$/$1gn/
    - derive/([dtngkhrzcs])o(u|ng)$/$1o/
    - derive/ong$/on/
    - derive/ao$/oa/
    - derive/([iu])a(o|ng?)$/a$1$2/
```

### 二、`segmentor`

- `segmentor`配合`recognizer`标记出`tag`。这里会用到`affix_segmentor`和`abc_translator`
- `tag`用在`translator`、`reverse_lookup_filter`、`simplifier`中用以标定各自作用范围
- 如果不需要用到`extra_tags`则不需要单独配置`segmentor`

1. `tag:` 设定其`tag`
2. `prefix:` 设定其前缀标识，可不塡，不塡则无前缀
3. `suffix:` 设定其尾缀标识，可不塡，不塡则无尾缀
4. `tips:` 设定其输入前提示符，可不塡，不塡则无提示符
5. `closing_tips:` 设定其结束输入提示符，可不塡，不塡则无提示符
6. `extra_tags:` 为此`segmentor`所标记的段落插上其它`tag`

**当`affix_segmentor`和`translator`重名时，两者可并在一处配置，此处 1-5 条对应下面 19-23 条。`abc_segmentor`仅可设`extra_tags`**

#### **示例**

```yaml
# cangjie6.schema.yaml

reverse_lookup:
  tag: reverse_lookup
  prefix: '`'
  suffix: ';'
  tips: '【反查】'
  closing_tips: '【苍颉】'
  extra_tags:
    - pinyin_lookup
    - jyutping_lookup
```

### 三、`translator`

- 每个方案有一个主`translator`，在引擎列表中不以`@`+翻译器名定义，在细项配置时直接以`translator:`命名。以下加粗项为可在主`translator`中定义之项，其它可在副〔以`@`+翻译器名命名〕`translator`中定义

1. **`enable_charset_filter:`** 是否开启字符集过滤〔仅`table_translator`有效。启用`cjk_minifier`后可适用于`script_translator`〕
2. **`enable_encoder:`** 是否开启自动造词〔仅`table_translator`有效〕
3. **`encode_commit_history:`** 是否对已上屏词自动成词〔仅`table_translator`有效〕
4. **`max_phrase_length:`** 最大自动成词词长〔仅`table_translator`有效〕
5. **`enable_completion:`** 提前显示尚未输入完整码的字〔仅`table_translator`有效〕
6. **`sentence_over_completion:`** 在无全码对应字而仅有逐键提示时也开启智能组句〔仅`table_translator`有效〕
7. **`strict_spelling:`** 配合`speller`中的`fuzz`规则，仅以略拼码组词〔仅`table_translator`有效〕
8. **`disable_user_dict_for_patterns:`** 禁止某些编码录入用户词典
9. **`enable_sentence:`** 是否开启自动造句
10. **`enable_user_dict:`** 是否开启用户词典〔用户词典记录动态字词频、用户词〕
    - 以上选塡`true`或`false`
11. **`dictionary:`** 翻译器将调取此字典文件
12. **`prism:`** 设定由此主翻译器的`speller`生成的棱镜文件名，或此副编译器调用的棱镜名
13. **`user_dict:`** 设定用户词典名
14. **`db_class:`** 设定用户词典类型，可设`tabledb`〔文本〕或`userdb`〔二进制〕
15. **`preedit_format:`** 上屏码自定义
16. **`comment_format:`** 提示码自定义
17. **`spelling_hints:`** 设定多少字以内候选标注完整带调拼音〔仅`script_translator`有效〕
18. **`initial_quality:`** 设定此翻译器出字优先级
19. `tag:` 设定此翻译器针对的`tag`。可不塡，不塡则仅针对`abc`
20. `prefix:` 设定此翻译器的前缀标识，可不塡，不塡则无前缀
21. `suffix:` 设定此翻译器的尾缀标识，可不塡，不塡则无尾缀
22. `tips:` 设定此翻译器的输入前提示符，可不塡，不塡则无提示符
23. `closing_tips:` 设定此翻译器的结束输入提示符，可不塡，不塡则无提示符

#### **示例**

```yaml
# cangjie6.schema.yaml 苍颉主翻译器

translator:
  dictionary: cangjie6
  enable_charset_filter: true
  enable_sentence: true
  enable_encoder: true
  encode_commit_history: true
  max_phrase_length: 5
  preedit_format:
    - xform/^([a-z ])$/$1｜\U$1\E/
    - xform/(?<=[a-z])\s(?=[a-z])//
    - 'xlit|ABCDEFGHIJKLMNOPQRSTUVWXYZ|日月金木水火土竹戈十大中一弓人心手口尸廿山女田止卜片|'
  comment_format:
    - 'xlit|abcdefghijklmnopqrstuvwxyz~|日月金木水火土竹戈十大中一弓人心手口尸廿山女田止卜片・|'
  disable_user_dict_for_patterns:
    - '^z.$'
  initial_quality: 0.75
```

```yaml
# cangjie6.schema.yaml 拼音副翻译器

pinyin:
  tag: pinyin
  dictionary: luna_pinyin
  enable_charset_filter: true
  prefix: 'P' #须配合recognizer
  suffix: ';' #须配合recognizer
  preedit_format:
    - 'xform/([nl])v/$1ü/'
    - 'xform/([nl])ue/$1üe/'
    - 'xform/([jqxy])v/$1u/'
  tips: '【汉拼】'
  closing_tips: '【苍颉】'
```

```yaml
# pinyin_simp.schema.yaml 拼音・简化字主翻译器

translator:
  dictionary: luna_pinyin
  prism: luna_pinyin_simp
  preedit_format:
    - xform/([nl])v/$1ü/
    - xform/([nl])ue/$1üe/
    - xform/([jqxy])v/$1u/
```

```yaml
# luna_pinyin.schema.yaml 朙月拼音用户短语

custom_phrase: #这是一个table_translator
  dictionary: ''
  user_dict: custom_phrase
  db_class: tabledb
  enable_sentence: false
  enable_completion: false
  initial_quality: 1
```

### 四、`reverse_lookup_filter`

- 此滤镜须挂在`translator`上，不影响该`translator`工作

1.  `tags:` 设定其作用范围
2.  `overwrite_comment:` 是否覆盖其他提示
3.  `dictionary:` 反查所得提示码之码表
4.  `comment_format:` 自定义提示码格式

#### **示例**

```yaml
# cangjie6.schema.yaml

pinyin_reverse_lookup: #该反查滤镜名
  tags: [pinyin_lookup] #挂在这个tag所对应的翻译器上
  overwrite_comment: true
  dictionary: cangjie6 #反查所得为苍颉码
  comment_format:
    - 'xform/$/〕/'
    - 'xform/^/〔/'
    - 'xlit|abcdefghijklmnopqrstuvwxyz |日月金木水火土竹戈十大中一弓人心手口尸廿山女田止卜片、|'
```

### 五、`simplifier`

1.  `option_name:` 对应`switches`中设定的切换项名
2.  `opencc_config:` 用字转换配置文件
    - 位于：`rime_dir/opencc/`，自带之配置文件含：
      - 繁转简〔默认〕：`t2s.json`
      - 繁转台湾：`t2tw.json`
      - 繁转香港：`t2hk.json`
      - 简转繁：`s2t.json`
3.  `tags:` 设定转换范围
4.  `tips:` 设定是否提示转换前的字，可塡`none`〔或不塡〕、`char`〔仅对单字有效〕、`all`
5.  `show_in_comment:` 设定是否仅将转换结果显示在备注中
6.  _`excluded_types:`_ 取消特定范围
    〔一般为 _`reverse_lookup_translator`_〕转化用字

#### **示例**

```yaml
# 修改自 luna\_pinyin\_kunki.schema
zh_tw:
  option_name: zh_tw
  opencc_config: t2tw.json
  tags: [abc] #abc对应abc_segmentor
  tips: none
```

### 六、 _`chord_composer`_

- 并击把键盘分两半，相当于两块键盘。两边同时击键，系统默认在其中一半上按的键先于另一半，由此得出上屏码

1.  `alphabet:` 字母表，包含用于并击的按键。击键虽有先后，形成并击时，一律以字母表顺序排列
2.  `algebra:` 拼写运算规则，将一组并击编码转换为拼音音节
3.  `output_format:` 并击完成后套用的式样，追加隔音符号
4.  `prompt_format:` 并击过程中套用的式样，加方括弧

#### **示例**

```yaml
# combo_pinyin.schema.yaml

chord_composer:
  # 字母表，包含用于并击的按键
  # 击键虽有先后，形成并击时，一律以字母表顺序排列
  alphabet: "swxdecfrvgtbnjum ki,lo."
  # 拼写运算规则，将一组并击编码转换为拼音音节
  algebra:
    # 先将物理按键字符对应到宫保拼音键位中的拼音字母
    - 'xlit|swxdecfrvgtbnjum ki,lo.|sczhlfgdbktpRiuVaNIUeoE|'
    # 以下根据宫保拼音的键位分别变换声母、韵母部分
    # 组合声母
    - xform/^zf/zh/
    - xform/^cl/ch/
    - xform/^fb/m/
    - xform/^ld/n/
    - xform/^hg/r/
    ……
    # 声母独用时补足隠含的韵母
    - xform/^([bpf])$/$1u/
    - xform/^([mdtnlgkh])$/$1e/
    - xform/^([mdtnlgkh])$/$1e/
    - xform/^([zcsr]h?)$/$1i/
  # 并击完成后套用的式样，追加隔音符号
  output_format:
    - "xform/^([a-z]+)$/$1'/"
  # 并击过程中套用的式样，加方括弧
  prompt_format:
    - "xform/^(.*)$/[$1]/"
```

### 七、其它

- 包括`recognizer`、`key_binder`、`punctuator`。**标点**、**快捷键**、**二三选重**、**特殊字符**等均于此设置

1.  **`import_preset:`** 由外部统一文件导入
2.  `recognizer:` 下设`patterns:` 配合`segmentor`的`prefix`和`suffix`完成段落划分、`tag`分配
    - `:`前字段可以为以`affix_segmentor@someTag`定义的`Tag`名，或者`punct`、`reverse_lookup`两个内设的字段。其它字段不调用输入法引擎，输入即输出〔如`url`等字段〕
3.  `key_binder:` 下设`bindings:` 设置功能性快捷键

    - 每一条`binding`可能包含：
      ```
      accept: 实际所按之键
      send: 输出效果
      toggle: 切换开关
      when: 作用范围
      ```
      > 〔`send`和`toggle`二选一〕
    - `toggle`可用字段包含五个开关名
    - `when`可用字段包含：
      ```
      paging: 翻䈎用
      has_menu: 操作候选项用
      composing: 操作输入码用
      always: 全域
      ```
    - `accept`和`send`可用字段除 A-Za-z0-9 外，还包含以下键板上实际有的键：

      ```
      BackSpace: 退格
      Tab: 水平定位符
      Linefeed: 换行
      Clear: 清除
      Return: 回车
      Pause: 暂停
      Sys_Req: 印屏
      Escape: 退出
      Delete: 删除
      Home: 原位
      Left: 左箭头
      Up: 上箭头
      Right: 右箭头
      Down: 下箭头
      Prior、Page_Up: 上翻
      Next、Page_Down: 下翻
      End: 末位
      Begin: 始位
      Shift_L: 左Shift
      Shift_R: 右Shift
      Control_L: 左Ctrl
      Control_R: 右Ctrl
      Meta_L: 左Meta
      Meta_R: 右Meta
      Alt_L: 左Alt
      Alt_R: 右Alt
      Super_L: 左Super
      Super_R: 右Super
      Hyper_L: 左Hyper
      Hyper_R: 右Hyper
      Caps_Lock: 大写锁
      Shift_Lock: 上档锁
      Scroll_Lock: 滚动锁
      Num_Lock: 小键板锁
      Select: 选定
      Print: 列印
      Execute: 执行
      Insert: 插入
      Undo: 还原
      Redo: 重做
      Menu: 菜单
      Find: 蒐寻
      Cancel: 取消
      Help: 帮助
      Break: 中断

      space:
      exclam: !
      quotedbl: "
      numbersign: #
      dollar: $
      percent: %
      ampersand: &
      apostrophe: '
      parenleft: (
      parenright: )
      asterisk: *
      plus: +
      comma: ,
      minus: -
      period: .
      slash: /
      colon: :
      semicolon: ;
      less: <
      equal: =
      greater: >
      question: ?
      at: @
      bracketleft: [
      backslash: \
      bracketright: ]
      asciicircum: ^
      underscore: _
      grave: `
      braceleft: {
      bar: |
      braceright: }
      asciitilde: ~

      KP_Space: 小键板空格
      KP_Tab: 小键板水平定位符
      KP_Enter: 小键板回车
      KP_Delete: 小键板删除
      KP_Home: 小键板原位
      KP_Left: 小键板左箭头
      KP_Up: 小键板上箭头
      KP_Right: 小键板右箭头
      KP_Down: 小键板下箭头
      KP_Prior、KP_Page_Up: 小键板上翻
      KP_Next、KP_Page_Down: 小键板下翻
      KP_End: 小键板末位
      KP_Begin: 小键板始位
      KP_Insert: 小键板插入
      KP_Equal: 小键板等于
      KP_Multiply: 小键板乘号
      KP_Add: 小键板加号
      KP_Subtract: 小键板减号
      KP_Divide: 小键板除号
      KP_Decimal: 小键板小数点
      KP_0: 小键板0
      KP_1: 小键板1
      KP_2: 小键板2
      KP_3: 小键板3
      KP_4: 小键板4
      KP_5: 小键板5
      KP_6: 小键板6
      KP_7: 小键板7
      KP_8: 小键板8
      KP_9: 小键板9
      ```

4.  `editor`用以订制操作键〔不支持`import_preset:`〕，键板键名同`key_binder/bindings`中的`accept`和`send`，效果定义如下：
    ```
    confirm: 上屏候选项
    commit_comment: 上屏候选项备注
    commit_raw_input: 上屏原始输入
    commit_script_text: 上屏变换后输入
    commit_composition: 语句流单字上屏
    revert: 撤消上次输入
    back: 按字符回退
    back_syllable: 按音节回退
    delete_candidate: 删除候选项
    delete: 向后删除
    cancel: 取消输入
    noop: 空
    ```
5.  `punctuator:` 下设`full_shape:`和`half_shape:`分别控制全角模式下的符号和半角模式下的符号，另有`use_space:`空格顶字〔`true`或`false`〕
    - 每条标点项可加`commit`直接上屏和`pair`交替上屏两种模式，默认为选单模式

#### **示例**

```yaml
# 修改自 cangjie6.schema.yaml

key_binder:
  import_preset: default
  bindings:
    - { accept: semicolon, send: 2, when: has_menu } #分号选第二重码
    - { accept: apostrophe, send: 3, when: has_menu } #引号选第三重码
    - { accept: 'Control+1', select: .next, when: always }
    - { accept: 'Control+2', toggle: full_shape, when: always }
    - { accept: 'Control+3', toggle: simplification, when: always }
    - { accept: 'Control+4', toggle: extended_charset, when: always }

editor:
  bindings:
    Return: commit_comment

punctuator:
  import_preset: symbols
  half_shape:
    "'": { pair: ['“', '”'] } #第一次按是“，第二次是”
    '(': ['〔', '［'] #弹出选单
    .: { commit: '。' } #无选单，直接上屏。优先级最高

recognizer:
  import_preset: default
  patterns:
    email: '^[a-z][-_.0-9a-z]*@.*$'
    url: '^(www[.]|https?:|ftp:|mailto:).*$'
    reverse_lookup: '`[a-z]*;?$'
    pinyin_lookup: '`P[a-z]*;?$'
    jyutping_lookup: '`J[a-z]*;?$'
    pinyin: "(?<!`)P[a-z']*;?$"
    jyutping: "(?<!`)J[a-z']*;?$"
    punct: '/[a-z]*$' #配合symbols.yaml中的特殊字符输入
```

## 其它

- Rime 还为每个方案提供选单和一定的外观订制能力
- 通常情况下`menu`在`default.yaml`中定义〔或用户修改档`default.custom.yaml`〕，`style`在`squirrel.yaml`或`weasel.yaml`〔或用户修改档`squirrel.custom.yaml`或`weasel.custom.yaml`〕

#### **示例**

```yaml
menu:
  alternative_select_keys: ASDFGHJKL #如编码字符占用数字键则须另设选字键
  page_size: 5 #选单每䈎显示个数

style:
  font_face: 'HanaMinA, HanaMinB' #字体〔小狼毫得且仅得设一个字体；鼠须管得设多个字体，后面的字体自动补前面字体不含的字〕
  font_point: 15 #字号
  horizontal: false #横／直排
  line_spacing: 1 #行距
  inline_preedit: true #输入码内嵌
```
