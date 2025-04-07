<script lang="ts">
    import * as Box from "../common/box";
    import ImageLink from "../common/ImageLink.svelte";
</script>

<div id="home-page">
    <div class="sidebar">
        <img src="/avatar.png" alt="Avatar" class="avi" />

        <div class="about">
            <h1>hi, im aenri</h1>
            <span>pup/it / θ∆</span>
            <span>poly puppy developer</span>
            <span>ageless therian loli</span>
            <span>radqueer, anti-harm</span>
        </div>
        <div style="">
            <Box._ width="14rem m:20rem">
                <Box.Head>&lt;3</Box.Head>
                <Box.Body nogap>
                    <span>i am bound by soul to love any and all</span>
                    <span>i am bound by oath to do no harm</span>
                </Box.Body>
            </Box._>
        </div>
        <div style="">
            <Box._ width="14rem m:20rem">
                <Box.Head>find me here</Box.Head>
                <Box.Body>
                    <ImageLink
                        href="https://discord.com/users/98133204636028928"
                        label="discord"
                        src="/links/discord.svg"
                    />
                    <ImageLink
                        href="https://signal.me/#eu/s2xWaaUelilwvDaVg6xjIC73BHzWC_CQuy47fhTEn-eTLI94cMpK3Ls7E_hkOPUL"
                        label="signal"
                        src="/links/signal.svg"
                    />
                    <ImageLink
                        href="https://bsky.app/profile/aenri.loveh.art"
                        label="bluesky"
                        src="/links/bsky.svg"
                    />
                    <ImageLink
                        href="https://x.com/aenri_"
                        label="twitter"
                        src="/links/twitter.svg"
                    />
                </Box.Body>
                <Box.Head special>find others here</Box.Head>
                <Box.Body>
                    <ImageLink
                        href="https://sylvie.loveh.art"
                        label="my wife"
                        src="/twemoji/ring.svg"
                    />
                    <ImageLink
                        href="https://nora.loveh.art"
                        label="dog"
                        src="/twemoji/dog.svg"
                    />
                    <ImageLink
                        href="https://kawaiizenbo.me"
                        label="dog"
                        src="/twemoji/dog2.svg"
                    />
                    <ImageLink
                        href="https://kass.loveh.art"
                        label="dog"
                        src="/twemoji/dog3.svg"
                    />
                </Box.Body>
            </Box._>
        </div>
    </div>
    <div class="info">
        <Box._ className="cbox" width="25rem m:20rem">
            <Box.Head>about me</Box.Head>
            <Box.Body align="left">
                <p>
                    im an autistic transfem developer mostly coding in rust,
                    kotlin, and typescript.
                </p>
                <p>
                    im currently out of school, working up to something big in
                    july.
                </p>
                <p>
                    i currently reside in the midwest US, with my clocks set to
                    eastern time
                </p>
                <p style="width: 100%">i love all of my 6 partners! &lt;3</p>
            </Box.Body>
        </Box._>
        <Box._ width="25rem m:20rem">
            <Box.Head>88x31s</Box.Head>
            <Box.Body>
                <a href="https://kawaiizenbo.me/" class="button-88x31"
                    ><img
                        src="/88x31/kawaiizenbo.me.gif"
                        alt="kawaiizenbo"
                        width="88"
                        height="31"
                    /></a
                >
                <div class="button-88x31">
                    <img
                        src="/88x31/paws.gif"
                        width="88"
                        height="31"
                        alt="made with my own two paws!"
                        class="button-88x31"
                    />
                </div>
                <a href="https://nora.loveh.art/" class="button-88x31"
                    ><img
                        src="/88x31/em.png"
                        alt="noraa"
                        width="88"
                        height="31"
                    /></a
                >
            </Box.Body>
        </Box._>
        <Box._ width="25rem m:20rem">
            <Box.Body>more coming soon!</Box.Body>
        </Box._>
    </div>
</div>

<style lang="scss">
    #home-page {
        display: flex;
        min-height: 100%;
        min-width: 100%;
        flex-grow: 1;
        flex-direction: column;
        padding: 2rem;
        gap: 2rem;
    }
    .sidebar {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
    }
    .avi {
        border-radius: 1rem;
        width: 200px;
    }
    .about {
        display: flex;
        flex-direction: column;
        h1 {
            font-size: x-large;
            font-weight: bold;
        }
        align-items: center;
    }
    @media screen and (min-width: 940px) {
        #home-page {
            flex-direction: row;
        }
        .sidebar {
            flex-direction: column;
            height: 100%;
            max-width: 14rem;
        }
        .info {
            align-items: flex-start;
        }
    }
    @media screen and (max-width: 939px) and (min-width: 545px) {
        #home-page {
            flex-direction: column;
        }
        .sidebar {
            display: grid;
            grid-template:
                "a b"
                "c d";
            width: 100%;
        }
        .avi {
            width: 175px;
        }
        .info {
            align-items: center;
            justify-content: center;
        }
    }
    @media screen and (max-width: 544px) {
        #home-page {
            flex-direction: column;
        }
        .sidebar {
            display: flex;
            flex-wrap: wrap;
            > :nth-child(1) {
                order: 2;
            }
            > :nth-child(2) {
                order: 1;
            }
            > :nth-child(3) {
                order: 3;
            }
            > :nth-child(4) {
                order: 4;
            }
            width: 100%;
        }
        .avi {
            width: 100px;
        }
        .info {
            align-items: center;
            justify-content: center;
        }
    }
    .info {
        display: flex;
        gap: 2rem;
        flex-direction: column;
    }

    .button-88x31:active {
        box-shadow: inset 3px 3px 10px 0px rgba(0, 0, 0, 0.75);
        img {
            z-index: -1;
            position: relative;
        }
    }
</style>
