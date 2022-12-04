// @ts-nocheck
import {UnaryReadOperation} from "./instruction";
import {CPU} from "../cpu";
import {MemoryView} from "../memory-view";

export class Interrupt extends UnaryReadOperation
{
    private number: MemoryView;

    execute(cpu: CPU): number
    {
        cpu.onInterrupt.emit(this.number.getValue());
        return cpu.getNextInstruction();
    }

    loadParameters(number: MemoryView): void
    {
        this.number = number;
    }
}
