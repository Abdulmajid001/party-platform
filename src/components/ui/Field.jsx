import { cn } from "@/lib/utils";

// Label + input/select/textarea in one. Use `as="select"` or `as="textarea"`.
export default function Field({ label, as: Tag = "input", id, className, children, ...props }) {
  const fieldId = id || props.name;

  return (
    <div className={className}>
      <label htmlFor={fieldId} className="mb-1.5 block text-sm font-medium">
        {label}
      </label>
      <Tag
        id={fieldId}
        className={cn(
          "w-full rounded-lg border border-rule bg-white px-3.5 py-2.5 text-sm outline-none transition",
          "placeholder:text-muted/60 focus:border-leaf focus:ring-2 focus:ring-leaf/20"
        )}
        {...props}
      >
        {children}
      </Tag>
    </div>
  );
}
