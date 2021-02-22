var template2 = `
    <div class="mx-auto bg-white m-5">
      <div class="flex row justify-between w-full">
        <div class="w-1/2 h-52 bg-yellow-500" id="InvoiceDetails">
        {{{CompanyName}}}
          <div class="flex row flex-wrap ml-10 mt-12">
          {{{InvoiceLabel}}}
          {{{InvoiceNumber}}}
          {{{DateLabel}}}
          {{{Date}}}
          {{{DueDateLabel}}}
          {{{DueDate}}}
          </div>
        </div>
        <div class="w-1/2 h-52" id="ClientDetails">
          <div class="flex row flex-wrap ml-24 mt-12">
          {{{INVOICETOLabel}}}
          {{{ClientName}}}
          {{{ClientAddressLine1}}}
          {{{ClientAddressLine2}}}
          {{{ClientPhoneNumber}}}
          {{{ClientMail}}}
          </div>
        </div>
      </div>
       
    <div class="flex items-start w-4/5 py-2 -mx-1 mt-10 ml-16 bg-gray-400 text-white">
      <div class="flex-1 px-2">
        Item Description
      </div>
      <div class="w-32 px-1 text-left">
        Quantity
      </div>
      <div class="w-20 px-1 text-left">
        Rate
      </div>
      <div class="w-20 px-2 text-left">
        Amount
      </div>
      <div class="w-1 px-2">
      </div>
    </div>
    {{#each repeater}} 
      <div class="flex items-start w-4/5 py-2 -mx-1  ml-16">
        <div class="flex-1 px-2">
          {{{this.description}}}
        </div>
        <div class="w-32 px-1 text-left">
          {{{this.quantity}}}
        </div>
        <div class="w-20 px-1 text-left">
          {{{this.rate}}}
        </div>
        <div class="w-20 px-2 text-left">
          {{{this.amount}}}
        </div>
        <div class="w-1 px-2">
        {{#if @index }}
        {{#unless ../previewMode}}
          <button name="delete-item" data-index="{{@index}}">
            <svg class="w-4 h-4 inline text-red-500 pointer-events-none"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
          </button>
        {{/unless}}
        {{/if}}
        </div>
      </div>
    {{/each}}
<br/>
    {{#each repeater2}} 
      <div class="flex items-start w-4/5 py-2 -mx-1 bg-gray-100 ml-16">
        <div class="flex-1 px-2">
          
        </div>
        <div class="w-32 px-1 text-left">
         
        </div>
        <div class="w-28 px-1 text-left">
          {{{this.label}}}
        </div>
        <div class="w-20 px-2 text-left">
          {{{this.val}}}
        </div>
        <div class="w-1 px-2">
        </div>
      </div>
    {{/each}}
    

    {{#unless previewMode}}
      <div class="text-right">
      <button name="add-item" class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded ">
        <svg class="w-4 h-4 inline object-top pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>
    {{/unless}}
    <div class='w-1/2'>
    {{{terms_label}}}<br/>
    {{{terms}}}
    </div>
<hr class="mt-12" / >
    <div class="flex row justify-between py-5" id="Company details">
        <div class="w-1/3 h-30 px-5" >
          <div class="flex row flex-wrap">
          {{{Address}}}
          {{{AddressLine1}}}
          {{{AddressLine2}}}
          </div>
        </div>
        <div class="w-1/3 h-30 px-5" >
          <div class="flex row flex-wrap">
          {{{PhoneNumberLabel}}}
          {{{PhoneNumber1}}}
          {{{PhoneNumber2}}}
          </div>
        </div>
        <div class="w-1/3 h-30 px-5" >
          <div class="flex row flex-wrap">
          {{{EmailLabel}}}
          {{{Mail1}}}
          {{{Mail2}}}
          </div>
        </div>
      </div>
    </div>
    `
    export default template2;