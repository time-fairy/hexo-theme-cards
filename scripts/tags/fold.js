'use strict';

hexo.extend.tag.register('fold', (args, content) => {
    const config = hexo.theme.config.fold;

    if (!config || config.enable !== true) {
        return;
    }

    const text = hexo.render.renderSync({ text: content, engine: 'markdown' });

    args = args.join(' ').split(',');

    let style, title;

    if (args.length > 1) {
        style = args[0].trim();
        title = args[1].trim();
    } else if (args.length > 0) {
        title = args[0].trim();
    }

    title = title ? title : config.summary;

    if (config.motion === true) {
        return `
        <div class="sliding-fold ${style.indexOf('open') > -1 ? 'expanded' : 'collapsed'}">
            <summary>${title}</summary>
            <div class="fold-content">
                ${text}
            </div>
        </div>
        `
    }

    return `
    <details ${style ? style : ''}>
        <summary>${title}</summary>
        <div class="fold-content">
            ${text}
        </div>
    </details>
    `
}, { ends: true });
