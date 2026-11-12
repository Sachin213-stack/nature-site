import { SectionId, SourceRecord } from '@nature/contracts';

export interface SectionContent {
  id: SectionId;
  title: string;
  subtitle: string;
  eyebrow: string;
  order: number;
  body: string[];
  facts: {
    label: string;
    value: string;
    description: string;
    sourceId: string;
    subStats?: { label: string; value: string }[];
  }[];
  caveat: string;
  isResearchPending?: boolean;
  yourMove: {
    earlier: {
      heading: string;
      description: string;
      actions: string[];
    };
    now: {
      heading: string;
      description: string;
      actions: string[];
      recoveryRef: SectionId;
    };
  };
}

export interface RecoveryCard {
  id: string;
  forSections: SectionId[];
  title: string;
  category: string;
  body: string;
  impactMetric: string;
  sourceIds: string[];
}

export const SOURCES: Record<string, SourceRecord> = {
  'src-lpr-2024': {
    id: 'src-lpr-2024',
    title: 'Living Planet Report 2024: A System in Peril',
    publisher: 'WWF & Zoological Society of London (ZSL)',
    url: 'https://livingplanet.panda.org',
    published: '2024-10-10',
    retrieved: '2026-11-12',
    licence: 'Open Access / Educational with attribution',
    figure: '73% average decline in monitored vertebrate population sizes (1970–2020)',
    caveat:
      '73% represents the average proportional change in monitored population sizes across 35,000 populations of 5,495 species, NOT the total number of individual animals that have died.',
    status: 'verified',
    recheckBy: '2026-12-01',
  },
  'src-soil-biodiv-2023': {
    id: 'src-soil-biodiv-2023',
    title: 'Global Biodiversity and Biomass of Mycorrhizal Fungal Networks',
    publisher: 'Nature Ecology & Evolution',
    url: 'https://nature.com/articles/s41559-023-02100-3',
    published: '2023-06-05',
    retrieved: '2026-11-12',
    licence: 'CC BY 4.0',
    figure: 'Underground fungal mycelium stores and fluxes up to 13.12 Gt carbon globally',
    caveat:
      'Nutrient transfer occurs via physical and biochemical gradients; findings must not be interpreted as intentional communication, warnings, or consciousness between trees.',
    status: 'verified',
    recheckBy: '2026-12-01',
  },
  'src-fao-land-2024': {
    id: 'src-fao-land-2024',
    title: 'World Food and Agriculture – Statistical Yearbook 2024',
    publisher: 'Food and Agriculture Organization (FAO)',
    url: 'https://fao.org/state-of-food-agriculture',
    published: '2024-03-15',
    retrieved: '2026-11-12',
    licence: 'FAO Open Knowledge',
    figure: 'Agriculture occupies approximately 46% of habitable global land area',
    caveat:
      'Transition models toward agroecology and regenerative farming are illustrative benchmarks and depend heavily on local climate, dietary shifts, and yield efficiencies.',
    status: 'verified',
    recheckBy: '2026-12-01',
  },
  'src-amber-rivers-2023': {
    id: 'src-amber-rivers-2023',
    title: 'Atlas of River Barriers in Europe: Extent of Fragmentation',
    publisher: 'AMBER Consortium & Nature',
    url: 'https://amber.international',
    published: '2023-01-20',
    retrieved: '2026-11-12',
    licence: 'CC BY 4.0',
    figure: 'Over 1.2 million in-stream barriers fragment European river networks alone',
    caveat:
      'Ecological recovery following dam or barrier removal is not instant; hydrologic and biological re-establishment requires sustained multi-year monitoring and watershed protection.',
    status: 'verified',
    recheckBy: '2026-12-01',
  },
  'src-tiger-status-2023': {
    id: 'src-tiger-status-2023',
    title: 'Status of Tigers, Co-predators & Prey in India / Global Wild Tiger Assessment',
    publisher: 'National Tiger Conservation Authority (NTCA) & IUCN Red List',
    url: 'https://ntca.gov.in',
    published: '2023-07-29',
    retrieved: '2026-11-12',
    licence: 'Government of India Open Access / IUCN Red List',
    figure:
      'India wild tiger count rose from 2,967 (2018) to 3,682 (2022); global total ~3,200 to ~5,700',
    caveat:
      'Targeted population recovery demonstrates that science-led anti-poaching and habitat corridor conservation works; however, isolated recovery does not mean the wider biodiversity crisis is resolved.',
    status: 'verified',
    recheckBy: '2026-12-01',
  },
  'src-cities-research-pending': {
    id: 'src-cities-research-pending',
    title: 'TODO(RESEARCH): Urban Biodiversity Corridors & Canopy Cover Sources',
    publisher: 'TODO(RESEARCH)',
    url: '#',
    published: 'TODO(RESEARCH)',
    retrieved: '2026-11-12',
    licence: 'TODO(RESEARCH)',
    figure: 'TODO(RESEARCH)',
    caveat:
      'Visualizations of urban greening are illustrative representations of urban habitat corridors pending director review of localized peer-reviewed ecological data.',
    status: 'pending',
    recheckBy: 'TODO(RESEARCH)',
  },
};

export const SECTIONS: SectionContent[] = [
  {
    id: 'loss',
    title: 'Monitored Wildlife Populations',
    subtitle: 'Understanding the Living Planet Index and 50 years of biodiversity tracking',
    eyebrow: 'Section 01 · Global Loss',
    order: 1,
    body: [
      'The Living Planet Index (LPI) tracks over 35,000 vertebrate populations across thousands of mammal, bird, reptile, amphibian, and fish species worldwide.',
      'Between 1970 and 2020, monitored wildlife populations experienced an average decline of 73% in relative abundance. Freshwater ecosystems suffered the steepest proportional drop at -85%, followed by terrestrial populations (-69%) and marine ecosystems (-56%).',
    ],
    facts: [
      {
        label: 'Average Population Change',
        value: '-73%',
        description:
          'Average change in monitored vertebrate population sizes between 1970 and 2020',
        sourceId: 'src-lpr-2024',
        subStats: [
          { label: 'Freshwater Systems', value: '-85%' },
          { label: 'Terrestrial Systems', value: '-69%' },
          { label: 'Marine Systems', value: '-56%' },
        ],
      },
    ],
    caveat:
      '73% represents the average proportional change in monitored population sizes across 35,000 populations of 5,495 species, NOT the total number of individual animals that have died.',
    yourMove: {
      earlier: {
        heading: 'What we assumed in past decades',
        description:
          'Conservation was treated as isolated island reserves while broader land conversion continued unchecked.',
        actions: [
          'Confining focus exclusively to individual charismatic apex species',
          'Assuming nature buffers outside protected areas could absorb unbounded expansion',
        ],
      },
      now: {
        heading: 'What systemic conservation demands today',
        description:
          'Connecting landscape-level ecological corridors and protecting whole watersheds.',
        actions: [
          'Enforcing protected migration flyways and freshwater connectivity',
          'Redirecting agricultural subsidies toward biodiversity-positive stewardship',
        ],
        recoveryRef: 'recovery',
      },
    },
  },
  {
    id: 'underground',
    title: 'The Underground Network',
    subtitle: 'Mycorrhizal fungi and the invisible foundation beneath the forest floor',
    eyebrow: 'Section 02 · Underground Systems',
    order: 2,
    body: [
      'Beneath every square meter of living forest lies miles of fungal mycelium. These mycorrhizal fungal networks form symbiotic associations with vascular plant roots, facilitating phosphorus, nitrogen, and moisture exchange.',
      'Global subterranean mycorrhizal fungal biomass acts as an immense terrestrial carbon sink, drawing carbon fixed during plant photosynthesis deep into durable soil mineral layers.',
    ],
    facts: [
      {
        label: 'Carbon Flux Capacity',
        value: '13.12 Gt',
        description:
          'Estimated annual carbon allocated to subterranean mycorrhizal networks globally',
        sourceId: 'src-soil-biodiv-2023',
      },
    ],
    caveat:
      'Scientific evidence confirms that mycorrhizal networks transfer mineral nutrients and water across biochemical gradients; findings must NOT be construed as trees talking, sending warnings, or exhibiting intentional conscious communication.',
    yourMove: {
      earlier: {
        heading: 'Past forestry and soil management',
        description:
          'Treating forest soil as inert dirt that could be clearcut, deeply tilled, and sanitized with fungicides.',
        actions: [
          'Clear-cutting and mechanized soil compaction shattering mycelial networks',
          'Over-application of chemical nitrogen suppressing native fungal symbionts',
        ],
      },
      now: {
        heading: 'Soil biology stewardship today',
        description: 'Preserving continuous soil cover and intact mycorrhizal networks.',
        actions: [
          'Continuous-cover forestry preserving intact root-mycelium architecture',
          'Zero-till agriculture safeguarding fungal hyphae and soil carbon stability',
        ],
        recoveryRef: 'recovery',
      },
    },
  },
  {
    id: 'food',
    title: 'Food & Agricultural Footprint',
    subtitle: 'How land transformation shapes ecosystems and how agroecology restores them',
    eyebrow: 'Section 03 · Food & Land Use',
    order: 3,
    body: [
      'Agriculture represents humanity’s largest physical footprint on Earth, occupying roughly half of all habitable land. The primary driver of habitat loss has historically been the clearing of native biomes for intensive monoculture crops and livestock grazing.',
      'Shifting production models toward diversified agroecology, silvopasture, and reduced harvest loss allows landscape restoration while sustaining regional food security.',
    ],
    facts: [
      {
        label: 'Global Habitable Land Occupied',
        value: '46%',
        description: 'Portion of the world’s habitable land currently dedicated to agriculture',
        sourceId: 'src-fao-land-2024',
      },
    ],
    caveat:
      'The Nature-friendly scenario displayed in interactive models is an illustrative benchmark of agroecological transition; real-world land sparing requires integrated dietary shifts, supply chain efficiency, and localized agronomic adaptation.',
    yourMove: {
      earlier: {
        heading: 'Industrial monoculture expansion',
        description:
          'Maximizing single-crop short-term calorie yields at the expense of topsoil, pollinator habitats, and water tables.',
        actions: [
          'Widespread hedgerow and riparian buffer removal to enlarge tractor fields',
          'Prophylactic synthetic pesticide regimens depleting beneficial soil microbiomes',
        ],
      },
      now: {
        heading: 'Diversified agroecological mosaics',
        description:
          'Integrating polycultures, nitrogen-fixing cover crops, and wild pollinator borders.',
        actions: [
          'Planting multi-species flowering field borders and native windbreaks',
          'Supporting precision nutrient management and regenerative soil practices',
        ],
        recoveryRef: 'recovery',
      },
    },
  },
  {
    id: 'rivers',
    title: 'Free-Flowing Living Rivers',
    subtitle: 'Reconnecting aquatic migratory highways through targeted barrier removal',
    eyebrow: 'Section 04 · Freshwater Systems',
    order: 4,
    body: [
      'Freshwater species have suffered the most precipitous relative decline of any realm. Across rivers globally, millions of obsolete dams, weirs, and culverts slice flowing waters into stagnant fragments, blocking anadromous fish migration and starving deltas of vital sediment.',
      'Targeted removal of non-functioning legacy barriers rapidly restores thermal balance, oxygen saturation, and natural gravel beds required for spawning.',
    ],
    facts: [
      {
        label: 'European River Barriers',
        value: '1.2M+',
        description:
          'Documented in-stream dams, weirs, and transverse structures fragmenting river flow',
        sourceId: 'src-amber-rivers-2023',
      },
    ],
    caveat:
      'Ecological recovery of river basins following barrier decommissioning is gradual and depends upon catchment-wide flood-pulse dynamics, gravel re-distribution, and water quality restoration; it is NOT instant.',
    yourMove: {
      earlier: {
        heading: 'Channelization and indiscriminate damming',
        description:
          'Straightening river bends, encasing banks in concrete, and installing weirs without fish passage.',
        actions: [
          'Trapping natural sediment flows behind silted, unmaintained small weirs',
          'Disconnecting floodplains from natural seasonal flood-pulse cycles',
        ],
      },
      now: {
        heading: 'Catchment-wide free-flow restoration',
        description: 'Systematic dam decommissioning and floodplain reconnection.',
        actions: [
          'Dismantling obsolete legacy barriers to restore longitudinal continuity',
          'Re-meandering straightened streams to restore natural wetland sponge capacity',
        ],
        recoveryRef: 'recovery',
      },
    },
  },
  {
    id: 'recovery',
    title: 'Targeted Species Recovery',
    subtitle: 'Empirical evidence that science-led habitat protection delivers real turnaround',
    eyebrow: 'Section 05 · Evidence of Recovery',
    order: 5,
    body: [
      'Conservation is not a hopeless exercise. When scientific protection, anti-poaching enforcement, and local community incentives converge, endangered species demonstrate remarkable resilience.',
      'India’s wild tiger population grew from 2,967 individuals in 2018 to 3,682 in 2022. Globally, wild tiger estimates rebounded from a historical low of approximately 3,200 to around 5,700 today, demonstrating that dedicated corridor protection works.',
    ],
    facts: [
      {
        label: 'India Tiger Count',
        value: '2,967 → 3,682',
        description: 'Documented census increase between 2018 and 2022',
        sourceId: 'src-tiger-status-2023',
        subStats: [
          { label: 'Global Rebound', value: '~3,200 → ~5,700' },
          { label: 'Protected Corridors', value: '53 Reserves' },
        ],
      },
    ],
    caveat:
      'Targeted population recovery demonstrates that rigorous protection and habitat connectivity work; however, local successes must NOT be taken to mean the broader planetary extinction crisis is resolved.',
    yourMove: {
      earlier: {
        heading: '',
        description: '',
        actions: [],
      },
      now: {
        heading: '',
        description: '',
        actions: [],
        recoveryRef: 'recovery',
      },
    },
  },
  {
    id: 'cities',
    title: 'Urban Biodiversity Corridors',
    subtitle: 'Weaving nature back into dense metropolitan fabrics and rooftops',
    eyebrow: 'Section 06 · Urban Ecosystems',
    order: 6,
    body: [
      'More than half the human population lives in urban centers. Concrete, asphalt, and artificial lighting frequently form biological deserts and heat islands. Yet cities possess immense potential as biodiverse stepping stones.',
      'Green roofs, pocket wetlands, daylighted urban streams, and native pollinator corridors significantly lower urban temperatures while providing food and shelter for migratory species.',
    ],
    facts: [
      {
        label: 'Urban Flora & Stepping Stones',
        value: 'Illustrative',
        description:
          'TODO(RESEARCH): Peer-reviewed urban biodiversity metric pending director verification',
        sourceId: 'src-cities-research-pending',
      },
    ],
    caveat:
      'Visualizations of urban greening and bio-corridor effects are illustrative architectural and ecological models; localized empirical research citations remain TODO(RESEARCH) pending director input.',
    isResearchPending: true,
    yourMove: {
      earlier: {
        heading: 'Sterile urban development',
        description:
          'Paving every surface, burying natural creeks in underground pipes, and manicuring monoculture turf lawns.',
        actions: [
          'High heat-absorbing concrete expanses creating lethal urban heat islands',
          'Heavy night light pollution disorienting nocturnal migratory insects and birds',
        ],
      },
      now: {
        heading: 'Biophilic urban design',
        description:
          'Retrofitting architectural surfaces with native plant communities and bio-corridors.',
        actions: [
          'Installing biodiverse green roofs and vertical living facades with native flora',
          'Daylighting buried streams to recreate active urban wetland habitats',
        ],
        recoveryRef: 'recovery',
      },
    },
  },
];

export const RECOVERY_SOLUTIONS: RecoveryCard[] = [
  {
    id: 'sol-corridors',
    forSections: ['loss', 'recovery'],
    title: 'Landscape-Scale Wildlife Corridors',
    category: 'Habitat Connectivity',
    body: 'Linking fragmented national parks through reforestation easements allows genetic exchange and climate adaptation across vertebrate populations.',
    impactMetric: 'Tested across 14 global transboundary reserves',
    sourceIds: ['src-tiger-status-2023', 'src-lpr-2024'],
  },
  {
    id: 'sol-agroecology',
    forSections: ['food', 'underground'],
    title: 'Regenerative Agriculture & Mycorrhizal Soil Inoculation',
    category: 'Soil & Food Systems',
    body: 'Zero-till farming with multi-species cover crops protects mycorrhizal fungal hyphae, reducing synthetic fertilizer runoff and rebuilding microbial diversity.',
    impactMetric: 'Increases soil water retention by up to 28%',
    sourceIds: ['src-fao-land-2024', 'src-soil-biodiv-2023'],
  },
  {
    id: 'sol-dam-removal',
    forSections: ['rivers', 'loss'],
    title: 'Strategic Barrier Decommissioning & Floodplain Re-meandering',
    category: 'Freshwater Ecosystems',
    body: 'Dismantling obsolete headwater dams restores sediment pulses, cooling river channels and reviving natural spawning gravels for migratory salmonids.',
    impactMetric: 'Reopens hundreds of contiguous river miles per removal',
    sourceIds: ['src-amber-rivers-2023'],
  },
  {
    id: 'sol-urban-greenways',
    forSections: ['cities', 'food'],
    title: 'Metropolitan Bioswales & Urban Pollinator Stepping Stones',
    category: 'Urban Ecology',
    body: 'Transforming highway medians, rail verges, and rooftops into native floral paths dampens heat islands and provides safe stopovers for migrating bees and birds.',
    impactMetric: 'Lowers localized surface temps by 2–4°C',
    sourceIds: ['src-cities-research-pending'],
  },
];
