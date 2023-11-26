<script lang="ts">
	import { cn } from '@dookdiks/utils';
	import Logo from '$lib/components/logo.svelte';
</script>

<div class="h-full w-full flex flex-row justify-start">

	<nav class="flex-wrap h-full w-1/6 block bg-white overflow-hidden bg-raisinblack-base justify-between">
		
		<div class="flex items-center flex-row shadow-md border text-milk-base">
			<Logo class="stroke-milk-base fill-milk-base rounded-full mt-6 mr-6 ml-6 mb-6" />
		</div>
		<ul class="flex flex-col">
			<li>
				<a
					href="#"
					class="flex flex-row items-center h-20 transform hover:translate-x-2 transition-transform ease-in duration-250 shadow-md border text-milk-base hover:text-milk-base"
				>
					<span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"
						><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M15 14s1 0 1-1s-1-4-5-4s-5 3-5 4s1 1 1 1h8Zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276c.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022ZM11 7a2 2 0 1 0 0-4a2 2 0 0 0 0 4Zm3-2a3 3 0 1 1-6 0a3 3 0 0 1 6 0ZM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4c0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904c.243-.294.526-.569.846-.816ZM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724c.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0a3 3 0 0 1-6 0Zm3-2a2 2 0 1 0 0 4a2 2 0 0 0 0-4Z"/></svg></span
					>
					<span class="text-sm font-medium text-milk-base">DINE IN</span>
				</a>
			</li>
			<li>
				<a
					href="#"
					class="flex flex-row items-center h-20 transform hover:translate-x-2 transition-transform ease-in duration-250 shadow-md border text-milk-base hover:text-milk-base"
				>
					<span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"
						><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M16.25 3.75v1.69l2 1.6V3.75h-2Zm3.5 4.49V3.5c0-.69-.56-1.25-1.25-1.25H16c-.69 0-1.25.56-1.25 1.25v.74l-.407-.326a3.75 3.75 0 0 0-4.686 0l-8.125 6.5a.75.75 0 0 0 .937 1.172l.781-.626v10.29H2a.75.75 0 0 0 0 1.5h20a.75.75 0 0 0 0-1.5h-1.25V10.96l.782.626a.75.75 0 0 0 .936-1.172L19.75 8.24Zm-.5 1.52l-5.844-4.675a2.25 2.25 0 0 0-2.812 0L4.75 9.76v11.49h3.5v-4.3c0-.664 0-1.237.062-1.696c.066-.492.215-.963.597-1.345s.854-.531 1.345-.597c.459-.062 1.032-.062 1.697-.062h.098c.665 0 1.238 0 1.697.062c.492.066.963.215 1.345.597s.531.853.597 1.345c.062.459.062 1.032.062 1.697v4.299h3.5V9.76Zm-5 11.49V17c0-.728-.002-1.2-.048-1.546c-.044-.325-.114-.427-.172-.484c-.057-.057-.159-.128-.484-.172c-.347-.046-.818-.048-1.546-.048c-.728 0-1.2.002-1.546.048c-.325.044-.427.115-.484.172c-.057.057-.128.159-.172.484c-.046.347-.048.818-.048 1.546v4.25h4.5ZM12 8.25a1.25 1.25 0 1 0 0 2.5a1.25 1.25 0 0 0 0-2.5ZM9.25 9.5a2.75 2.75 0 1 1 5.5 0a2.75 2.75 0 0 1-5.5 0Z" clip-rule="evenodd"/></svg></span
					>
					<span class="text-sm font-medium text-milk-base">TAKE AWAY</span>
				</a>
			</li>
			<li>
				<a
					href="#"
					class="flex flex-row items-center h-20 transform hover:translate-x-2 transition-transform ease-in duration-250 shadow-md border text-milk-base hover:text-milk-base"
				>
					<span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M2 2h20v20H2V2Zm2 2v5.5h16V4H4Zm16 7.5H4V20h16v-8.5ZM5.996 6H8v2h-.004v.004h-2V6ZM10 6h8v2h-8V6Z"/></svg></span
					>
					<span class="text-sm font-medium text-milk-base">MENU</span>
				</a>
			</li>
			<li>
				<a
					href="#"
					class="flex flex-row items-center h-20 transform hover:translate-x-2 transition-transform ease-in duration-250 shadow-md border text-milk-base hover:text-milk-base"
				>
					<span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"
						><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5" d="m15.578 3.382l2 1.05c2.151 1.129 3.227 1.693 3.825 2.708C22 8.154 22 9.417 22 11.94v.117c0 2.525 0 3.788-.597 4.802c-.598 1.015-1.674 1.58-3.825 2.709l-2 1.049C13.822 21.539 12.944 22 12 22s-1.822-.46-3.578-1.382l-2-1.05c-2.151-1.129-3.227-1.693-3.825-2.708C2 15.846 2 14.583 2 12.06v-.117c0-2.525 0-3.788.597-4.802c.598-1.015 1.674-1.58 3.825-2.708l2-1.05C10.178 2.461 11.056 2 12 2s1.822.46 3.578 1.382ZM21 7.5l-4 2M12 12L3 7.5m9 4.5v9.5m0-9.5l4.5-2.25l.5-.25m0 0V13m0-3.5l-9.5-5"/></svg></span
					>
					<span class="text-sm font-medium text-milk-base">STOCK</span>
				</a>
			</li>
			<li>
				<a
					href="#"
					class="flex flex-row items-center h-20 transform hover:translate-x-2 transition-transform ease-in duration-250 shadow-md border text-milk-base hover:text-milk-base"
				>
					<span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"
						><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M2 7v17h28V7H2zm4 2h20a2 2 0 0 0 2 2v9a2 2 0 0 0-2 2H6a2 2 0 0 0-2-2v-9a2 2 0 0 0 2-2zm10 2c-2.211 0-4 2.016-4 4.5s1.789 4.5 4 4.5c2.211 0 4-2.016 4-4.5S18.211 11 16 11zm0 2c1.102 0 2 1.121 2 2.5s-.898 2.5-2 2.5c-1.102 0-2-1.121-2-2.5s.898-2.5 2-2.5zm-7.5 1a1.5 1.5 0 1 0 .001 3.001A1.5 1.5 0 0 0 8.5 14zm15 0a1.5 1.5 0 1 0 .001 3.001A1.5 1.5 0 0 0 23.5 14z"/></svg></span
					>
					<span class="text-sm font-medium text-milk-base">BILL HISTORY</span>
				</a>
			</li>
			<li>
				<a
					href="#"
					class="flex flex-row items-center h-20 transform hover:translate-x-2 transition-transform ease-in duration-250 shadow-md border text-milk-base hover:text-milk-base"
				>
					<span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"
						><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M9 17H7v-7h2v7m4 0h-2V7h2v10m4 0h-2v-4h2v4m2 2H5V5h14v14.1M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2Z"/></svg></span
					>
					<span class="text-sm font-medium text-milk-base">REPORT</span>
				</a>
			</li>
			<li>
				<a
					href="#"
					class="flex flex-row items-center h-20 transform hover:translate-x-2 transition-transform ease-in duration-250 border text-milk-base hover:text-milk-base"
				>
					<span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"
						><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M16 12a4 4 0 1 1-8 0a4 4 0 0 1 8 0Zm-1.5 0a2.5 2.5 0 1 0-5 0a2.5 2.5 0 0 0 5 0Z"/><path fill="currentColor" d="M12 1c.266 0 .532.009.797.028c.763.055 1.345.617 1.512 1.304l.352 1.45c.019.078.09.171.225.221c.247.089.49.19.728.302c.13.061.246.044.315.002l1.275-.776c.603-.368 1.411-.353 1.99.147c.402.349.78.726 1.128 1.129c.501.578.515 1.386.147 1.99l-.776 1.274c-.042.069-.058.185.002.315c.112.238.213.481.303.728c.048.135.142.205.22.225l1.45.352c.687.167 1.249.749 1.303 1.512c.038.531.038 1.063 0 1.594c-.054.763-.616 1.345-1.303 1.512l-1.45.352c-.078.019-.171.09-.221.225c-.089.248-.19.491-.302.728c-.061.13-.044.246-.002.315l.776 1.275c.368.603.353 1.411-.147 1.99c-.349.402-.726.78-1.129 1.128c-.578.501-1.386.515-1.99.147l-1.274-.776c-.069-.042-.185-.058-.314.002a8.606 8.606 0 0 1-.729.303c-.135.048-.205.142-.225.22l-.352 1.45c-.167.687-.749 1.249-1.512 1.303c-.531.038-1.063.038-1.594 0c-.763-.054-1.345-.616-1.512-1.303l-.352-1.45c-.019-.078-.09-.171-.225-.221a8.138 8.138 0 0 1-.728-.302c-.13-.061-.246-.044-.315-.002l-1.275.776c-.603.368-1.411.353-1.99-.147c-.402-.349-.78-.726-1.128-1.129c-.501-.578-.515-1.386-.147-1.99l.776-1.274c.042-.069.058-.185-.002-.314a8.606 8.606 0 0 1-.303-.729c-.048-.135-.142-.205-.22-.225l-1.45-.352c-.687-.167-1.249-.749-1.304-1.512a11.158 11.158 0 0 1 0-1.594c.055-.763.617-1.345 1.304-1.512l1.45-.352c.078-.019.171-.09.221-.225c.089-.248.19-.491.302-.728c.061-.13.044-.246.002-.315l-.776-1.275c-.368-.603-.353-1.411.147-1.99c.349-.402.726-.78 1.129-1.128c.578-.501 1.386-.515 1.99-.147l1.274.776c.069.042.185.058.315-.002c.238-.112.481-.213.728-.303c.135-.048.205-.142.225-.22l.352-1.45c.167-.687.749-1.249 1.512-1.304C11.466 1.01 11.732 1 12 1Zm-.69 1.525c-.055.004-.135.05-.161.161l-.353 1.45a1.832 1.832 0 0 1-1.172 1.277a7.147 7.147 0 0 0-.6.249a1.833 1.833 0 0 1-1.734-.074l-1.274-.776c-.098-.06-.186-.036-.228 0a9.774 9.774 0 0 0-.976.976c-.036.042-.06.131 0 .228l.776 1.274c.314.529.342 1.18.074 1.734a7.147 7.147 0 0 0-.249.6a1.831 1.831 0 0 1-1.278 1.173l-1.45.351c-.11.027-.156.107-.16.162a9.63 9.63 0 0 0 0 1.38c.004.055.05.135.161.161l1.45.353a1.832 1.832 0 0 1 1.277 1.172c.074.204.157.404.249.6c.268.553.24 1.204-.074 1.733l-.776 1.275c-.06.098-.036.186 0 .228c.301.348.628.675.976.976c.042.036.131.06.228 0l1.274-.776a1.83 1.83 0 0 1 1.734-.075c.196.093.396.176.6.25a1.831 1.831 0 0 1 1.173 1.278l.351 1.45c.027.11.107.156.162.16a9.63 9.63 0 0 0 1.38 0c.055-.004.135-.05.161-.161l.353-1.45a1.834 1.834 0 0 1 1.172-1.278a6.82 6.82 0 0 0 .6-.248a1.831 1.831 0 0 1 1.733.074l1.275.776c.098.06.186.036.228 0c.348-.301.675-.628.976-.976c.036-.042.06-.131 0-.228l-.776-1.275a1.834 1.834 0 0 1-.075-1.733c.093-.196.176-.396.25-.6a1.831 1.831 0 0 1 1.278-1.173l1.45-.351c.11-.027.156-.107.16-.162a9.63 9.63 0 0 0 0-1.38c-.004-.055-.05-.135-.161-.161l-1.45-.353c-.626-.152-1.08-.625-1.278-1.172a6.576 6.576 0 0 0-.248-.6a1.833 1.833 0 0 1 .074-1.734l.776-1.274c.06-.098.036-.186 0-.228a9.774 9.774 0 0 0-.976-.976c-.042-.036-.131-.06-.228 0l-1.275.776a1.831 1.831 0 0 1-1.733.074a6.88 6.88 0 0 0-.6-.249a1.835 1.835 0 0 1-1.173-1.278l-.351-1.45c-.027-.11-.107-.156-.162-.16a9.63 9.63 0 0 0-1.38 0Z"/></svg></span
					>
					<span class="text-sm font-medium text-milk-base">SETTING</span>
				</a>
			</li>

		</ul>
	
		<div class="flex mt-auto items-center h-20 transform hover:translate-x-2 transition-transform ease-in duration-250 border text-milk-base hover:text-milk-base">	
			<span class="text-md font-medium  text-milk-base">ACCOUNT</span>
	</div>
	</nav>

</div>


