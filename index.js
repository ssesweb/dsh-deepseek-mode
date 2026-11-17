// Host half: per-session web_search gate driven by /dsw-search commands.
// Default (no command seen) allows everything, so other presets are unaffected.

const searchOff = new WeakSet()

export const inject = ['tools']

export function apply(ctx) {
  // Command: /dsw-search on|off  (client toggle dispatches this)
  let registerCommand = null
  try {
    registerCommand = ctx.commands?.register?.bind(ctx.commands)
  } catch {}

  if (registerCommand) {
    ctx.effect(
      registerCommand({
        name: 'dsw-search',
        description: 'Toggle web search for this session',
        input: { hint: 'on | off' },
        handler: ({ agent, rawInput }) => {
          const arg = String(rawInput || '').trim().toLowerCase()
          if (arg === 'off') {
            if (agent) searchOff.add(agent)
            return { kind: 'success', text: 'web search: off' }
          }
          if (arg === 'on') {
            if (agent) searchOff.delete(agent)
            return { kind: 'success', text: 'web search: on' }
          }
          const current = agent && searchOff.has(agent) ? 'off' : 'on'
          return { kind: 'error', text: `usage: /dsw-search on|off (current: ${current})` }
        },
      }),
    )
  }

  // Gate web_search per agent. web_fetch stays allowed (link reading is always on,
  // matching chat.deepseek.com). Agents never toggled off are untouched.
  const dispose = ctx.on('tools/pre-execute', async function (exec, next) {
    if (exec.name === 'web_search' && exec.agent && searchOff.has(exec.agent)) {
      return {
        kind: 'deny',
        reason:
          'web_search is disabled: the web-search toggle in the composer is off. Ask the user to enable it, or answer from existing knowledge.',
      }
    }
    return next()
  })

  return () => {
    try { dispose && dispose() } catch {}
  }
}
