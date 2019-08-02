import { promisify } from 'util'
import { exec } from 'child_process'

export const asyncExec = (args) => promisify(exec)(args)
