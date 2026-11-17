window.__ModuleLoader__.load({
  id: 'dsh-deepseek-mode',
  factory(require) {
    const React = require('react');
    const h = React.createElement;

    const KEY_PREFIX = 'dsw-deepseek-mode.';
    const ACCENT = 'var(--dsw-brand, #4d6bfe)';
    const ACTIVE_FILL = 'var(--dsw-alias-button-ghost-active-fill, rgba(77, 107, 254, 0.12))';

    function readState(sessionId) {
      try {
        const raw = localStorage.getItem(KEY_PREFIX + sessionId);
        if (raw) {
          const parsed = JSON.parse(raw);
          return { thinking: !!parsed.thinking, search: !!parsed.search };
        }
      } catch {}
      return { thinking: false, search: false };
    }

    function writeState(sessionId, state) {
      try { localStorage.setItem(KEY_PREFIX + sessionId, JSON.stringify(state)); } catch {}
    }

    // Icons copied from deepseek-ai/chat-demo (MIT): IconThinkOutline14, IconGlobeLanguageOutline14.
    function IconThink() {
      return h('svg', { viewBox: '0 0 14 14', width: 14, height: 14, 'aria-hidden': true, fill: 'none' },
        h('path', { d: 'M7.06431 5.93342C7.68763 5.93342 8.19307 6.43904 8.19322 7.06233C8.19322 7.68573 7.68772 8.19123 7.06431 8.19123C6.44099 8.19113 5.9354 7.68567 5.9354 7.06233C5.93555 6.43911 6.44108 5.93353 7.06431 5.93342Z', fill: 'currentColor' }),
        h('path', {
          fillRule: 'evenodd', clipRule: 'evenodd', fill: 'currentColor',
          d: 'M8.6815 0.963693C10.1169 0.447019 11.6266 0.374829 12.5633 1.31135C13.5 2.24805 13.4277 3.75776 12.911 5.19319C12.7126 5.74431 12.4386 6.31796 12.0965 6.89729C12.4969 7.54638 12.8141 8.19018 13.036 8.80647C13.5527 10.2419 13.6251 11.7516 12.6883 12.6883C11.7516 13.625 10.242 13.5527 8.8065 13.036C8.19022 12.8141 7.54641 12.4969 6.89732 12.0965C6.31797 12.4386 5.74435 12.7125 5.19322 12.911C3.75777 13.4276 2.2481 13.5 1.31138 12.5633C0.374859 11.6266 0.447049 10.1168 0.963724 8.68147C1.17185 8.10338 1.46321 7.50063 1.82896 6.8924C1.52182 6.35711 1.27235 5.82825 1.08872 5.31819C0.572068 3.88278 0.499714 2.37306 1.43638 1.43635C2.37308 0.499655 3.8828 0.572044 5.31822 1.08869C5.82828 1.27232 6.35715 1.5218 6.89243 1.82893C7.50066 1.46318 8.10341 1.17181 8.6815 0.963693ZM11.3573 8.01154C10.9083 8.62253 10.3901 9.22873 9.80943 9.8094C9.22877 10.3901 8.62255 10.9083 8.01158 11.3572C8.4257 11.5841 8.8287 11.7688 9.21275 11.9071C10.5456 12.3868 11.4246 12.2547 11.8397 11.8397C12.2548 11.4246 12.3869 10.5456 11.9071 9.21272C11.7688 8.82866 11.5841 8.42568 11.3573 8.01154ZM2.56529 8.02912C2.37344 8.39322 2.21495 8.74796 2.09263 9.08772C1.61291 10.4204 1.74512 11.2995 2.16001 11.7147C2.57505 12.1297 3.45415 12.2618 4.78697 11.7821C5.11057 11.6656 5.44786 11.5164 5.7938 11.3367C5.249 10.9223 4.70922 10.4533 4.19029 9.9344C3.57578 9.31987 3.03169 8.67633 2.56529 8.02912ZM6.90708 3.2469C6.24065 3.70479 5.5646 4.26321 4.91392 4.91389C4.26325 5.56456 3.70482 6.24063 3.24693 6.90705C3.72674 7.63325 4.32777 8.37459 5.03892 9.08576C5.64943 9.69627 6.28183 10.2265 6.90806 10.6678C7.59368 10.2025 8.2908 9.63076 8.96079 8.96076C9.6308 8.29075 10.2025 7.59366 10.6678 6.90803C10.2265 6.2818 9.69631 5.6494 9.08579 5.03889C8.37462 4.32773 7.63328 3.72672 6.90708 3.2469ZM11.7147 2.15998C11.2996 1.74509 10.4204 1.61288 9.08775 2.0926C8.74835 2.21479 8.39382 2.37271 8.03013 2.56428C8.67728 3.03065 9.31995 3.5758 9.93443 4.19026C10.4534 4.7092 10.9223 5.24896 11.3368 5.79377C11.5164 5.44785 11.6656 5.11052 11.7821 4.78694C12.2618 3.45416 12.1297 2.57502 11.7147 2.15998ZM4.91197 2.2176C3.57922 1.73788 2.70004 1.86995 2.28501 2.28498C1.87001 2.70003 1.73791 3.5792 2.21763 4.91194C2.31709 5.18822 2.44112 5.47427 2.58677 5.7674C3.01931 5.1887 3.51474 4.6158 4.06529 4.06526C4.61584 3.5147 5.18872 3.01928 5.76743 2.58674C5.47431 2.4411 5.18824 2.31706 4.91197 2.2176Z',
        }));
    }

    function IconGlobe() {
      return h('svg', { viewBox: '0 0 14 14', width: 14, height: 14, 'aria-hidden': true, fill: 'none' },
        h('path', {
          fillRule: 'evenodd', clipRule: 'evenodd', fill: 'currentColor',
          d: 'M7 0.150391C10.7832 0.150391 13.8496 3.21685 13.8496 7C13.8496 10.7832 10.7832 13.8496 7 13.8496C3.21685 13.8496 0.150391 10.7832 0.150391 7C0.150391 3.21685 3.21685 0.150391 7 0.150391ZM5.37793 7.59961C5.42667 9.03204 5.64751 10.2965 5.97363 11.2197C6.15993 11.7471 6.36943 12.1301 6.57324 12.3701C6.77748 12.6105 6.9234 12.6504 7 12.6504C7.0766 12.6504 7.22252 12.6105 7.42676 12.3701C7.63057 12.1301 7.84007 11.7471 8.02637 11.2197C8.35249 10.2965 8.57333 9.03204 8.62207 7.59961H5.37793ZM1.38184 7.59961C1.61453 9.80492 3.1159 11.6304 5.14258 12.3359C5.03265 12.1128 4.93224 11.8724 4.84277 11.6191C4.46339 10.5451 4.22772 9.13988 4.17871 7.59961H1.38184ZM9.82129 7.59961C9.77228 9.13988 9.53661 10.5451 9.15723 11.6191C9.06771 11.8726 8.96645 12.1127 8.85645 12.3359C10.8836 11.6307 12.3854 9.80524 12.6182 7.59961H9.82129ZM7 1.34961C6.9234 1.34961 6.77748 1.38949 6.57324 1.62988C6.36943 1.86988 6.15993 2.25291 5.97363 2.78027C5.64751 3.70351 5.42667 4.96796 5.37793 6.40039H8.62207C8.57333 4.96796 8.35249 3.70351 8.02637 2.78027C7.84007 2.25291 7.63057 1.86988 7.42676 1.62988C7.22252 1.38949 7.0766 1.34961 7 1.34961ZM8.85645 1.66309C8.9666 1.88656 9.0676 2.12715 9.15723 2.38086C9.53661 3.45487 9.77228 4.86012 9.82129 6.40039H12.6182C12.3854 4.19465 10.8837 2.36828 8.85645 1.66309ZM5.14258 1.66309C3.11575 2.3685 1.61454 4.19497 1.38184 6.40039H4.17871C4.22772 4.86012 4.46339 3.45487 4.84277 2.38086C4.93234 2.1273 5.03249 1.88645 5.14258 1.66309Z',
        }));
    }

    // Pill style copied from chat-demo ChatInput.module.css .toggle/.selected;
    // missing ghost tokens are re-derived with color-mix from DSH theme tokens.
    const TOGGLE_CSS = `
.dsw-toggle{display:inline-flex;flex-shrink:0;align-items:center;justify-content:center;gap:4px;height:34px;padding:0 12px;border-radius:18px;border:1px solid var(--dsw-alias-border-l2);background-color:transparent;color:var(--dsw-alias-label-primary);font:inherit;font-size:13px;line-height:20px;font-weight:500;white-space:nowrap;cursor:pointer;user-select:none;transition-property:border,background;transition-duration:0.2s;}
.dsw-toggle:hover:not(:disabled){background-color:color-mix(in srgb, var(--dsw-alias-label-primary) 6%, transparent);}
.dsw-toggle.selected{background-color:color-mix(in srgb, var(--dsw-alias-brand-primary) 12%, transparent);color:var(--dsw-alias-brand-primary);border-color:color-mix(in srgb, var(--dsw-alias-brand-primary) 45%, transparent);}
.dsw-toggle.selected:hover{background-color:color-mix(in srgb, var(--dsw-alias-brand-primary) 18%, transparent);}
`;

    function Toggle(props2) {
      const { icon, label, selected, onClick } = props2;
      return h('button', {
        type: 'button',
        className: 'dsw-toggle' + (selected ? ' selected' : ''),
        'aria-pressed': !!selected,
        title: label,
        onClick,
      }, icon, h('span', null, label));
    }

    let remoteRef = null;

    function DeepseekToggles(props2) {
      const { sessionId, useProjection } = props2;
      const [state, setState] = React.useState(() => readState(sessionId));
      const prevEffortRef = React.useRef(null);
      const rowRef = React.useRef(null);
      const remote = remoteRef;

      const readPreset = () => {
        try {
          if (typeof useProjection !== 'function') return undefined;
          const raw = useProjection('agentPreset');
          const v = raw && typeof raw === 'object' && 'current' in raw ? raw.current : raw;
          return typeof v === 'string' ? v : undefined;
        } catch { return undefined; }
      };
      const preset = readPreset();
      // Hook-count stability: every hook below runs on every render. Only the
      // rendered output and the hide effect's body depend on the preset value.
      const isDeepseek = preset === undefined || preset === 'deepseek';
      const chipTarget = preset === 'deepseek';

      React.useEffect(() => { writeState(sessionId, state); }, [sessionId, state]);

      React.useEffect(() => {
        if (!chipTarget || !rowRef.current) return;
        const hidden = [];
        // DOM contract (scoped-slots.tsx): every renderSlot wraps content in
        // <div data-slot="<key>" style="display:contents">. Our span's parent
        // is the input.left anchor; the permission chip lives in the
        // conversation.input.permission anchor inside the same tool row.
        const apply = () => {
          let node = rowRef.current;
          for (let up = 0; node && up < 8; up++) {
            node = node.parentElement;
            if (!node) return;
            const chip = node.querySelector('[data-slot="conversation.input.permission"] button');
            if (chip) {
              if (chip.dataset.dswHidden === undefined) chip.dataset.dswHidden = chip.style.display || '';
              chip.style.display = 'none';
              if (!hidden.includes(chip)) hidden.push(chip);
              return;
            }
          }
        };
        apply();
        const observer = new MutationObserver(apply);
        const watchRoot = rowRef.current.parentElement && rowRef.current.parentElement.parentElement;
        if (watchRoot) observer.observe(watchRoot, { childList: true, subtree: true });
        return () => {
          observer.disconnect();
          for (const b of hidden) {
            if (b.dataset.dswHidden !== undefined) {
              b.style.display = b.dataset.dswHidden;
              delete b.dataset.dswHidden;
            }
          }
        };
      }, [chipTarget, sessionId]);

      const setThinking = async (next) => {
        setState(s => ({ ...s, thinking: next }));
        try {
          const raw = typeof useProjection === 'function' ? useProjection('modelSelection') : null;
          const cur = raw && raw.current ? raw.current : raw;
          if (!cur || !cur.provider || !cur.model || !remote) return;
          if (next) {
            prevEffortRef.current = cur.reasoningEffort || null;
            await remote.session.selectModel({
              sessionId, provider: cur.provider, model: cur.model, reasoningEffort: 'high',
            });
          } else {
            const restore = prevEffortRef.current;
            await remote.session.selectModel(restore
              ? { sessionId, provider: cur.provider, model: cur.model, reasoningEffort: restore }
              : { sessionId, provider: cur.provider, model: cur.model });
          }
        } catch {}
      };

      const setSearch = async (next) => {
        setState(s => ({ ...s, search: next }));
        try {
          if (remote && remote.commands && remote.commands.execute) {
            await remote.commands.execute(sessionId, next ? '/dsw-search on' : '/dsw-search off', []);
          }
        } catch {}
      };

      if (!isDeepseek) return null;
      return h('span', { ref: rowRef, style: { display: 'inline-flex', alignItems: 'center', gap: 10 } },
        h('style', null, TOGGLE_CSS),
        h(Toggle, {
          icon: h(IconThink), label: '深度思考',
          selected: state.thinking,
          onClick: () => setThinking(!state.thinking),
        }),
        h(Toggle, {
          icon: h(IconGlobe), label: '联网搜索',
          selected: state.search,
          onClick: () => setSearch(!state.search),
        }));
    }

    return {
      inject: ['slots', 'remote'],
      apply(ctx) {
        remoteRef = ctx.remote || null;
        ctx.slots.inject('conversation.input.left', () => ctx.slots.register({
          name: 'conversation.input.left',
          id: 'dsw-deepseek-toggles',
          order: 0,
          label: 'DeepSeek toggles',
        }, DeepseekToggles));
      },
    };
  },
});
