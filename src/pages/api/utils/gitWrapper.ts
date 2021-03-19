import { spawn } from 'child_process';

async function gitWpapper(args: string[], cwd: string) {
    let out = '';
    let err = '';
    const gitCommand = spawn('git', args, {
        cwd,
    });

    for await (const chunk of gitCommand.stdout) {
        out += chunk.toString();
    }

    for await (const chunk of gitCommand.stderr) {
        err += chunk.toString();
    }

    const exitCode = await new Promise((resolve) => {
        gitCommand.on('close', resolve);
    });

    if (exitCode) {
        throw new Error(`Git error: exit ${exitCode}, ${err}`);
    }

    return out;
}

export default gitWpapper;
