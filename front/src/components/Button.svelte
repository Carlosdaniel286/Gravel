<script lang="ts">
  import { cn } from "$lib/utils";

  interface ButtonFormProps {
    class?: string;
    text?: string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    color?: "confirm" | "cancel";
  }

  const { class: className, text, onClick, type = "button", color = "confirm" }: ButtonFormProps = $props();
</script>

<button
  onclick={onClick}
  type={type}
  class={cn(
    "rounded-lg cursor-pointer uppercase flex justify-center items-center gap-2 min-w-[100px] px-2 py-2 font-medium",
    color === "confirm"
      ? "bg-black text-white hover:bg-gray-800 "
      : "bg-white text-black border border-gray-300 hover:bg-gray-100",
    className
  )}
>
  {text}
</button>

 