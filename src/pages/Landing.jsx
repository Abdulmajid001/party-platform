import { motion } from "motion/react";
import { BadgeCheck } from "lucide-react";
import Button from "@/components/ui/Button";
import Avatar from "@/components/shared/Avatar";
import VerifiedBadge from "@/components/shared/VerifiedBadge";
import CountUp from "@/components/shared/CountUp";
import { IMAGES, avatar } from "@/data/images";
import { leaders } from "@/data/mock";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const rise = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const bubbleList = {
  hidden: {},
  show: { transition: { staggerChildren: 0.35 } },
};

const bubble = {
  hidden: { opacity: 0, y: 12, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1 },
};

export default function Landing() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-14 px-5 pb-20 pt-12 lg:grid-cols-[1.1fr_1fr] lg:pt-20">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.h1
            variants={rise}
            className="text-5xl font-extrabold leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl"
          >
            Every ward has a voice. Now it has a direct line to its leaders.
          </motion.h1>
          <motion.p variants={rise} className="mt-6 max-w-lg text-lg text-muted">
            Get announcements straight from verified party leaders, message them directly,
            and join the group for your ward, all in one place.
          </motion.p>
          <motion.div variants={rise} className="mt-8 flex flex-wrap gap-3">
            <Button to="/register" variant="sun" size="lg">Register now</Button>
            <Button to="/sign-in" variant="outline" size="lg">Sign in</Button>
          </motion.div>
          <motion.div variants={rise} className="mt-10 flex items-center gap-4">
            <div className="flex -space-x-3">
              {[11, 23, 36, 49].map((n) => (
                <Avatar key={n} src={avatar(n)} name="Member" size={40} className="ring-2 ring-white" />
              ))}
            </div>
            <p className="text-sm text-muted">
              <strong className="text-ink"><CountUp to={12480} /></strong> members across{" "}
              <strong className="text-ink">36</strong> states and the FCT
            </p>
          </motion.div>
        </motion.div>

        <div className="relative">
          <div className="grid grid-cols-2 gap-3">
            <motion.img
              src={IMAGES.heroTall}
              alt="Party members gathered at a community rally"
              className="row-span-2 h-full w-full rounded-[2rem] object-cover"
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.img
              src={IMAGES.heroTop}
              alt="A ward meeting in progress"
              className="aspect-[4/3] w-full rounded-2xl object-cover"
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.img
              src={IMAGES.heroBottom}
              alt="Neighbours talking in the community"
              className="aspect-[4/3] w-full rounded-tl-[2rem] rounded-br-2xl rounded-bl-2xl rounded-tr-2xl object-cover"
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          <motion.div
            className="absolute -bottom-6 left-2 max-w-[17rem] rounded-2xl border border-rule bg-white p-4 sm:-left-6"
            initial={{ opacity: 0, y: 30, rotate: -3 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ delay: 1, type: "spring", stiffness: 160, damping: 16 }}
          >
            <div className="flex items-center gap-2">
              <Avatar src={leaders[0].avatar} name={leaders[0].name} size={32} />
              <p className="flex items-center gap-1 text-sm font-semibold">
                {leaders[0].name} <VerifiedBadge size={14} />
              </p>
            </div>
            <p className="mt-2 text-sm">Ward congress holds this Saturday at 10am. Bring your member ID.</p>
            <p className="mt-1 text-xs text-muted">Ikeja Ward &middot; 2h ago</p>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl space-y-24 px-5 py-20">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <img
            src={IMAGES.announce}
            alt="A leader addressing a crowd"
            className="aspect-[4/3] w-full rounded-3xl object-cover"
            loading="lazy"
          />
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Hear it from the leader, not the rumour mill.
            </h2>
            <p className="mt-4 max-w-md text-muted">
              Announcements are posted by verified leaders and sent to the right audience:
              national, your state or your ward. No forwarded screenshots, no guessing.
            </p>
          </div>
        </div>

        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="md:order-2">
            <motion.div
              className="mx-auto max-w-sm space-y-3 rounded-3xl bg-mist p-6"
              variants={bubbleList}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
            >
              <motion.p variants={bubble} className="max-w-[80%] rounded-2xl rounded-bl-md bg-white p-3 text-sm">
                Good morning, when is the ward congress?
              </motion.p>
              <motion.p variants={bubble} className="ml-auto max-w-[80%] rounded-2xl rounded-br-md bg-leaf p-3 text-sm text-white">
                Saturday, 10am at the ward secretariat. Come with your member ID.
              </motion.p>
              <motion.p variants={bubble} className="max-w-[80%] rounded-2xl rounded-bl-md bg-white p-3 text-sm">
                Thank you. I will bring two neighbours.
              </motion.p>
            </motion.div>
          </div>
          <div className="md:order-1">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Message leaders directly, or join your ward group.
            </h2>
            <p className="mt-4 max-w-md text-muted">
              Ask a question, share a concern or organise with the people on your street.
              Direct chats and group conversations live in one inbox.
            </p>
          </div>
        </div>

        <div className="grid items-center gap-10 md:grid-cols-2">
          <ul className="divide-y divide-rule rounded-3xl border border-rule">
            {leaders.slice(0, 4).map((leader) => (
              <li key={leader.id} className="flex items-center gap-3 p-4">
                <Avatar src={leader.avatar} name={leader.name} size={44} />
                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-1 font-semibold">
                    <span className="truncate">{leader.name}</span> <VerifiedBadge />
                  </p>
                  <p className="text-sm text-muted">{leader.title}, {leader.state}</p>
                </div>
              </li>
            ))}
          </ul>
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Only verified leaders can speak for the party.
            </h2>
            <p className="mt-4 flex max-w-md gap-2 text-muted">
              <BadgeCheck className="mt-0.5 shrink-0 text-leaf" size={20} />
              Every leader account is checked by an administrator before it gets the badge, so
              you always know who you are talking to.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-5 pb-20">
        <div className="rounded-[2rem] bg-leaf px-8 py-14 text-center text-white sm:px-16">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight sm:text-5xl">
            Join your ward&rsquo;s group today.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-white/80">
            Registration takes about two minutes. Pick your state and ward and you are in.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button to="/register" variant="sun" size="lg">Register now</Button>
            <Button to="/sign-in" variant="ghost" size="lg" className="text-white hover:bg-white/10">
              I already have an account
            </Button>
          </div>
        </div>
        <p id="privacy" className="mx-auto mt-6 max-w-xl text-center text-xs text-muted">
          Your party membership is personal data. We only collect what we need and never publish
          member lists.
        </p>
      </section>
    </>
  );
}
