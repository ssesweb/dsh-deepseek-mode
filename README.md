# dsh-deepseek-mode

DeepSeek 网页版对齐模式 for DeepSeek Harness (DSH)。

中文 | [English](#english)

## 它做什么

一个 bundle，三件事：

- **DeepSeek 预设** (`deepseek`)：官方身份人格（中文优先、白描短句、不复述不反问），裁剪后的工具面（无 shell、无子代理、无调度）；文件读写保留，联网行为收进 persona。
- **输入框开关**：工具行左侧两个胶囊按钮——深度思考、联网搜索，图标与样式取自官方 chat-demo。深度思考切换该会话模型的 reasoning 档位（开启 = `high`，关闭恢复原档）；联网搜索按会话门控 `web_search` 工具。
- **Host 门控**：`/dsw-search on|off` 命令按会话记账；`tools/pre-execute` 对关闭的会话拒绝 `web_search`，`web_fetch` 恒开（对应官网"链接阅读"恒开）。从未切换过的会话完全不受影响，其他预设零波及。

开关状态按会话存 localStorage（`dsw-deepseek-mode.<sessionId>`）。

界面规则：开关与权限芯片的隐藏只在 `deepseek` 预设的会话生效；其他预设会话完全保持原样。

## 安装

方式一，命令行：

```sh
dsh plugin --profile desktop add dsh-deepseek-mode
```

方式二，Web 界面：**插件 → 添加插件 → npm 包** 填 `dsh-deepseek-mode`。

装完刷新页面；新建会话时预设选 **DeepSeek**。

## 依赖说明

- 需要可用的 web_search provider：装 [dsh-free-search](https://www.npmjs.com/package/dsh-free-search)（免 key 多引擎）或配置 DeepSeek 官方搜索。
- reasoning 档位切换要求所选模型支持档位；不支持时开关仅记录状态，不改变请求。

## 已知限制

- 预设在会话创建时固定，standard 会话不能中途转为 deepseek。
- 未复刻官网的来源引用面板；引用由模型以 Markdown 链接给出。
- 深度思考档位固定 `high`，未读模型目录的可用档位列表。

## 致谢

- 输入框图标与胶囊样式取自 [deepseek-ai/chat-demo](https://github.com/deepseek-ai/chat-demo)（MIT）。
- 基于 [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) 插件体系构建。

## License

MIT

---

<a id="english"></a>

# English

A DeepSeek-web-aligned mode for DeepSeek Harness (DSH). One bundle, three pieces:

- **Agent preset `deepseek`**: official-identity persona (Chinese-first, plain style), trimmed tool surface (no shell, no subagents, no delegation); file tools kept, web behavior folded into the persona.
- **Composer toggles**: two pill buttons at the left of the tool row — deep think and web search, icons and style from the official chat-demo. Deep think switches the session model's reasoning effort (on = `high`, off restores the previous value); web search gates the `web_search` tool per session.
- **Host gate**: the `/dsw-search on|off` command records per-agent state; `tools/pre-execute` denies `web_search` for opted-out sessions while `web_fetch` stays allowed (link reading is always on, matching chat.deepseek.com). Sessions never toggled are untouched; other presets are unaffected.

Toggle state persists per session in localStorage (`dsw-deepseek-mode.<sessionId>`).

UI rules: toggles and permission-chip hiding apply only to sessions on the `deepseek` preset; other presets stay stock.

Install: `dsh plugin --profile desktop add dsh-deepseek-mode`, or **Plugins → Add plugin** with the npm package name. Refresh, then pick the **DeepSeek** preset for new sessions.

Needs a working web_search provider: [dsh-free-search](https://www.npmjs.com/package/dsh-free-search) (keyless multi-engine) or the official DeepSeek search. Reasoning-effort switching requires a model that exposes efforts.

Icons and pill style from [deepseek-ai/chat-demo](https://github.com/deepseek-ai/chat-demo) (MIT). License: MIT.
