import { ControlValueAccessor } from "@angular/forms";
import { noop } from "rxjs/util/noop";

/**
 * Default ControlValueAccessor implementation for custom components with direct ngModel proxy
 */
export class DefaultControlValueAccessor implements ControlValueAccessor {
    //The internal data model
    protected innerValue: any = '';

    //Placeholders for the callbacks which are later provided
    //by the Control Value Accessor
    protected onTouchedCallback: () => void = noop;
    protected onChangeCallback: (_: any) => void = noop;

    //get accessor
    get value(): any {
        return this.innerValue;
    };

    //set accessor including call the onchange callback
    set value(v: any) {
        if (v !== this.innerValue) {
            this.innerValue = v;
            this.onChangeCallback(v);
        }
    }

    //Set touched on blur
    onBlur() {
        this.onTouchedCallback();
    }

    //From ControlValueAccessor interface
    writeValue(value: any) {
        if (value !== this.innerValue) {
            this.innerValue = value;
        }
    }

    //From ControlValueAccessor interface
    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    //From ControlValueAccessor interface
    registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }
}
