"use client";

import { Controller, UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Field,
  FieldLabel,
  FieldError,
  FieldGroup,
} from "@/components/ui/field";
import { TemplateFormValues } from "./builder-types";

interface IdentityTabProps {
  form: UseFormReturn<TemplateFormValues>;
}

export function IdentityTab({ form }: IdentityTabProps) {
  return (
    <div className="pt-6 space-y-6">
      <FieldGroup>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Template Name</FieldLabel>
              <Input {...field} value={field.value ?? ""} placeholder="Executive Card" className="rounded-lg border-border" />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <div className="grid grid-cols-2 gap-6">
          <Controller
            name="category"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Category</FieldLabel>
                <Input {...field} value={field.value ?? ""} placeholder="Executive" className="rounded-lg border-border" />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            name="layoutKey"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Base Theme</FieldLabel>
                <Select 
                  onValueChange={(val) => {
                    field.onChange(val);
                    form.setValue("config.cardLayoutKey", val);
                  }} 
                  value={field.value ?? "default"}
                >
                  <SelectTrigger className="w-full rounded-lg h-9 text-xs shadow-sm border-border focus-visible:ring-1 focus-visible:ring-foreground/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent position="popper" align="start" className="min-w-[170px] rounded-lg p-1">
                    <SelectItem value="default" className="text-xs">Standard Light</SelectItem>
                    <SelectItem value="modern-dark" className="text-xs">Deep Onyx</SelectItem>
                    <SelectItem value="glass" className="text-xs">Frosted Glass</SelectItem>
                  </SelectContent>
                </Select>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </div>
      </FieldGroup>
    </div>
  );
}
