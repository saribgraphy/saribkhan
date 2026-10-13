import { WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { intro } from "@/content/home";
import { site, whatsappLink } from "@/content/site";
import { Specimen } from "@/components/shell/wordmark";
import { PanelButton } from "@/components/ui/panel-button";

export function Hero() {
  return (
    <div>
      <h1 className="t-display mb-6">
        <span className="blur-in inline-block">
          {site.name}
          <Specimen size="lg" className="ml-2" />
        </span>
        <br />
        <span className="blur-in inline-block [animation-delay:100ms]">{site.tagline}</span>
      </h1>

      <div className="blur-in grid gap-4 [animation-delay:200ms]">
        <p className="t-lead">
          <span className="font-[480] text-ink">{intro.lead}</span>
        </p>
        <p className="t-lead">{intro.body}</p>
        <p className="t-lead">{intro.close}</p>
      </div>

      <div className="fold-in mt-10 flex flex-wrap items-center gap-3 [animation-delay:300ms]">
        <PanelButton panel="start" className="btn btn-primary">
          <span className="btn-label">Start a project</span>
        </PanelButton>
        <a href={whatsappLink()} target="_blank" rel="noreferrer" className="btn btn-ghost">
          <WhatsappLogo size={16} weight="fill" className="relative z-1" />
          <span className="btn-label">Send a voice note</span>
        </a>
      </div>
    </div>
  );
}
